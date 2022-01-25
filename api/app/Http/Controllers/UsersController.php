<?php

namespace App\Http\Controllers;

use App\Libraries\Helpers;
use App\Models\Company;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\JWTAuth;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use MongoDB\BSON\UTCDateTime;

class UsersController extends Controller
{

    const MODEL = "App\Models\User";

    use RESTActions;

    protected $jwt;
    protected $user;
    protected $local_id;

    public function __construct(JWTAuth $jwt)
    {
        $this->jwt = $jwt;
        $this->user = $this->jwt->parseToken()->authenticate();
        $payload = Auth::parseToken()->getPayload();
    }

    public function all(Request $request)
    {
        try {
            //Queries
            $per_page = $request->get("per_page") ? (int) $request->get("per_page") : 10;
            $order = $request->get("order") ? $request->get("order") : 'desc';
            $order_by = $request->get("order_by") ? $request->get("order_by") : '_id';
            $search = $request->get("q");

            //Model to get fillables
            $m = self::MODEL;
            $newM = new $m();

            //model to search results
            $model = self::MODEL;

            //Function query
            $result = $model::orderBy($order_by, $order)
                ->where(function ($query) use ($search) {
                    if (!$this->user->hasRoles(["root"])) {
                        $query->where('company_id', $this->user->company_id);
                        $query->whereHas("roles", function ($q) {
                            $q->where("type", "!=", "root");
                        });
                    }
                })
                ->where(function ($query) use ($search, $newM) {
                    if ($search) {
                        foreach ($newM->getFillable() as $column) {
                            if ($column != '_id')
                                $query->orWhere($column, 'like', '%' . $search . '%');
                        }
                    }
                })->paginate($per_page);

            return $this->respond(Response::HTTP_OK, $result);
        } catch (\ErrorException $e) {
            return response()->json(["error" => [$e->getLine(), $e->getMessage()]], 500);
        }
    }

    public function get($id)
    {
        try {
            $m = self::MODEL;
            $model = $m::find($id);
            if (is_null($model))
                return $this->respond(Response::HTTP_NOT_FOUND);

            $model->company;

            return $this->respond(Response::HTTP_OK, $model);
        } catch (\ErrorException $e) {
            return response()->json(["error" => [$e->getLine(), $e->getMessage()]], 500);
        }
    }

    public function add(Request $request)
    {
        try {
            $m = self::MODEL;

            $rules =  User::$rules;
            $rules["username"] = [
                "required",
                Rule::unique('users')->where(function ($query) {
                    return $query->whereNull('deleted_at');
                })
            ];

             // Validate if selected role.
            if (!$role_name = $request->input("role"))
                return response()->json(['role' => ['Debe elegir un role.']], 422);
            
            if ($this->user->hasRoles(["root"]) && $role_name == "admin")
                $rules["company"] = "required";

            if (!$this->user->hasRoles(["root"]) && $role_name == "root" ||
                $this->user->hasRoles(["user"]) && $role_name == "admin")
                return $this->isUnauthorized();

            //Validate rules
            Helpers::validate($request, $rules, $m::$messages);

            //Validate Passwords
            if($request->input("password") != $request->input("password_confirmation"))
                return response()->json(['password' => ['Los passwords ingresados no coinciden.']], 422);

            //Only get permission fields
            $data = $request->only(["username", "email", "first_name", "last_name", "birthday"]);

            $data["password"] = Hash::make($request->input("password"));
            $data["verification_code"] = sha1(Str::random(32));
            $data["verified_at"] = Carbon::now();

            // Asign Company if need or not
            $data["company_id"] = $role_name == "admin" && $this->user->hasRoles(["root"]) ? $request->input("company") : $this->user->company_id;

            //Validation birthday format
            if ($data["birthday"])
                $data["birthday"] =  new UTCDateTime(Carbon::parse($data["birthday"]));

            $user = $m::create($data);

            if($role = Role::where("type", $role_name)->first())
                $user->roles()->sync([$role->id]);

            return $this->respond(Response::HTTP_CREATED, $user);
        } catch (HttpResponseException $e) {
            return $e->getResponse();
        }
    }

    public function put(Request $request, $id)
    {
        try {
            // Control access by type user.
            if ($this->user->_id != $id)
                return $this->isUnauthorized();

            // Getting Model and Rules
            $m = self::MODEL;
            $rules["email"] = "required";
            Helpers::validate($request, $rules, $m::$messages);

            //Find or fail
            $user = $m::find($id);
            if (is_null($user))
                return $this->respond(Response::HTTP_NOT_FOUND);

            //Only get permission fields
            $data = $request->only(["email", "first_name", "birthday", "last_name", "password", "password_confirmation"]);

            if (isset($data["password"])) {
                if ($data["password"] != $data["password_confirmation"])
                    return response()->json(['password' => ['Los passwords ingresados no coinciden.']], 422);

                $data["password"] = app('hash')->make($data["password"]);
            }

            //Update avatar
            $avatar = $request->input('avatar');
            if ($avatar && isset($avatar['base64_image'])) {
                $newLogo = Helpers::save_image($avatar, 'avatars', "avatar_" . $id);
                if ($newLogo)
                    $data["avatar"] = $newLogo;
            }

            //Validation birthday format
            if ($data["birthday"])
                $data["birthday"] =  new UTCDateTime(Carbon::parse($data["birthday"]));

            $user->update($data);

            return $this->respond(Response::HTTP_OK, $user);
        } catch (HttpResponseException $e) {
            return $e->getResponse();
        } catch (\ErrorException $e) {
            return response()->json(["error" => [$e->getLine(), $e->getMessage()]], 500);
        }
    }

    public function remove($id)
    {
        try{
            $m = self::MODEL;
            $model = $m::find($id);
            if(is_null($model))
                return $this->respond(Response::HTTP_NOT_FOUND);

            //Check if is own element;
            if( $this->user->hasRoles(["user"]) || $this->user->hasRoles(["admin"]) && $model->company_id != $this->user->company_id)
               return $this->isUnauthorized();

            $model->delete($id);
            return $this->respond(Response::HTTP_NO_CONTENT);
        }catch(\ErrorException $e) {
            return response()->json(["error" => [$e->getLine(), $e->getMessage()]], 500);
        }
    }

    public function getSelfData()
    {
        try {
            $user = $this->jwt->parseToken()->authenticate();
            $user->company;
            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json(["error" => [$e->getLine(), $e->getMessage()]], 500);
        }
    }
}
