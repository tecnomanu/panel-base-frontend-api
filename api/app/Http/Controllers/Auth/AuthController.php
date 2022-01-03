<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Landing\Landing;
use App\Models\Role;
use App\Models\User;
use App\Notifications\ResetPasswordSuccess;
use App\Notifications\SendTokenResetPassword;
use App\Notifications\VerifyUserCode;
use App\Notifications\WelcomeMessage;
use Carbon\Carbon;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Tymon\JWTAuth\JWTAuth;
use MongoDB\BSON\UTCDateTime;

class AuthController extends Controller
{
    /**
     * @var \Tymon\JWTAuth\JWTAuth
     */
    protected $jwt;

    public function __construct(JWTAuth $jwt)
    {
        $this->jwt = $jwt;
    }

    public function login(Request $request)
    {
        $this->validate($request, [
            'username' => 'required|max:255',
            'password' => 'required'
        ]);
        try {
            $user = User::where("username", $request->input("username"))->first();
            if (!$user || !$token = Auth::claims(["role" => $user->role])->attempt($request->only('username', 'password')))
                return response()->json(['invalid_credentials'], 404);

            $user = $this->jwt->setToken($token)->user();

        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['token_expired'], 500);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], 500);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent' => $e->getMessage()], 500);
        }

        return response()->json(['token' => $token, 'user' => $user]);
    }

    public function register(Request $request)
    {
        $this->validate($request, [
            'username' => 'required|max:255|unique:users',
            'email' => 'required|email:rfc,dns|max:255|unique:users',
            'password' => 'required|confirmed|min:8',
            'password_confirmation' => 'required'
        ],[
            "email.email" => "error_dns_email",
            "email.unique" => "has_ready_taken",
        ]);
        try {
            $username = strtolower($request->username);

            $code = sha1(Str::random(32));

            $user = User::create([
                "first_name" => ucfirst($username),
                "username" => $username,
                "email" => $request->email,
                "company_id" => "",
                "password" => Hash::make($request->password),
                "verification_code" => $code
            ]);

            $company = Company::create([
                "name" => ucfirst($username),
                "slug" => $username,
                "owner_id" => $user->id,
            ]);

            $user->update(["company_id" => $company->id]);

            $role = Role::where("type", "admin")->first();
            $user->roles()->attach($role);

            $token = Auth::claims(["role" => $user->role])->fromUser($user);

            Auth::login($user); 

            $user->notify(new VerifyUserCode());

        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['token_expired'], 500);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], 500);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent' => $e->getMessage()], 500);
        } catch (\Swift_TransportException $e) {
            return response()->json(['email_error'], 500);
        }
        

        return response()->json(['token' => $token, 'user' => $user]);
    }

    public function sendVerificationEmail()
    {
        try {
            $code = sha1(Str::random(32));
            $user = auth()->user();
            $user->update(["verification_code" => $code]);
            $user->notify(new VerifyUserCode());
    
            return response()->json(['status' => 'sent'], 200);

        }catch(HttpResponseException $e){
            return $e->getResponse();
        }catch(\ErrorException $e) {
            return response()->json(["error" => [$e->getLine(), $e->getMessage()]], 500);
        }
    }

    public function verifyEmail(Request $request)
    {
        try {
            $code = $request->input("code");
            $id = $request->input("id");
            
            if(!$code)
                return response()->json(["status" => "error", "message" => "No se ingreso un codigo."], 404);

            if(!auth()->user() && !$id)
                return response()->json(["status" => "error", "message" => "Falta el id de usuario o token."], 404);

            if($id && !auth()->user()){
                $user = User::find($id);
                auth()->login($user);
            }

            if(auth()->user()->verification_code == $code){
                auth()->user()->update(["verified_at" => Carbon::now()]);
                auth()->user()->notify(new WelcomeMessage());
                return response()->json(['status' => 'valid'], 200);
            }

            return response()->json(['status' => 'error', "error" => "invalid_code"], 403);

        }catch(HttpResponseException $e){
            return $e->getResponse();
        }catch(\ErrorException $e) {
            return response()->json(["error" => [$e->getLine(), $e->getMessage()]], 500);
        }
    }

    public function requestPassword(Request $request)
    {
        try {
            $email = $request->input("email");

            if(!$email)
                return response()->json(["Ingrese un email valido"], 405);

            if(!$user = User::where("email", $email)->first())
                return response()->json(["El correo ingresado esta mal escrito o no corresponde a un usuario de la plataforma."], 405);
            
            $newToken = sha1(Str::random(32));

            DB::table("password_resets")->insert(["email" => $email, "reset_token" => $newToken, "created_at" => new UTCDateTime(Carbon::now()) ]);
            $user->notify(new SendTokenResetPassword($newToken));
    
            return response()->json(['status' => 'sent'], 200);

        }catch(HttpResponseException $e){
            return $e->getResponse();
        }catch(\ErrorException $e) {
            return response()->json(["error" => [$e->getLine(), $e->getMessage()]], 500);
        }
    }

    public function resetPassword(Request $request)
    {
        try {
            if(!$token = $request->input("reset_token"))
                return response()->json(["Token invalido"], 405);

            if(!$password = $request->input("password"))
                return response()->json(["El password es requerido"], 405);

            if($password !== $request->input("confirmPassword"))
                return response()->json(["Los passwords ingresados no coinciden"], 405);

            if(!$find = DB::table("password_resets")->where("reset_token", $token)->first())
                return response()->json(["Token invalido"], 405);

            if(Carbon::now()->diffInHours($find["created_at"]->toDateTime()) > 24)
                return response()->json(["El token ha caducado"], 405);

            if(!$user = User::where("email", $find['email'])->first())
                return response()->json(["Usuario invalido"], 405);

            $user->update([ "password" => app('hash')->make($password) ]);
            $user->notify(new ResetPasswordSuccess());

            DB::table("password_resets")->where("reset_token", $token)->delete();
    
            return response()->json(['status' => 'sent'], 200);

        }catch(HttpResponseException $e){
            return $e->getResponse();
        }catch(\ErrorException $e) {
            return response()->json(["error" => [$e->getLine(), $e->getMessage()]], 500);
        }
    }

    public function logout(){
        return response()->json('ok', 200);
    }
}