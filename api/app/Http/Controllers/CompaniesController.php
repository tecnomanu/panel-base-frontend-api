<?php namespace App\Http\Controllers;

use App\Libraries\Helpers;
use App\Models\Role;
use App\Models\User;
use App\Notifications\WelcomeMessage;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Tymon\JWTAuth\JWTAuth;

class CompaniesController extends Controller {

    const MODEL = "App\Models\Company";

    use RESTActions;

    protected $jwt;
    protected $user;
    protected $local_id;

    public function __construct(JWTAuth $jwt)
    {
        $this->jwt = $jwt;
        $this->user = $this->jwt->parseToken()->authenticate();
        $payload = Auth::parseToken()->getPayload();
        $this->local_id = $payload->get("local_id");
    }

    public function all(Request $request)
    {
        try{
            //Control access by type user.
            if( !$this->user->hasRoles(["root"]) )
                return $this->isUnauthorized();

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
                ->where(function ($query) use($search, $newM) {
                    if($search){
                        foreach($newM->getFillable() as $column)
                        {
                            if($column != '_id')
                                $query->orWhere($column, 'like', '%'.$search.'%');
                        }
                    }
                })->with("owner")->paginate($per_page);

            return $this->respond(Response::HTTP_OK, $result);
        }catch(\ErrorException $e) {
            return response()->json(["error" => [$e->getLine(), $e->getMessage()]], 500);
        }
    }

    public function add(Request $request)
    {
        try{
            /**
             * Validation Data Requests
             */

            // Check rules of Provider
            $m = self::MODEL;
            Helpers::validate($request, $m::$rules, $m::$messages);

            // Check rules of User
            $rules_user = User::$rules;
            Helpers::validate($request->input("user"), $rules_user, $m::$messages);

            // Getting User Data
            $user = $request->only(["user.username", "user.first_name", "user.email", "user.password" , "user.password_confirmation"]);
            $user_data = $user["user"];

            //Validation User Confirmation Password
            if($user_data['password'] != $user_data['password_confirmation'])
                return response()->json(['password' => ['Los passwords ingresados no coinciden.']], 422);
            
            /**
             * Creating New Company
             */

            // Getting Provider Data
            $data_company = $request->only(["name","cuit","email","address","phone"]);
            
            // Setting Slug name
            $data_company["slug"] = Str::snake($data_company["name"]);

            // Creating Provider
            $company = $m::create($data_company);

            // Return Failed if the provider has not been created.
            if(!$company)
                return response()->json(['error' => ['Hubo un error interno, intentelo de nuevo.']], 500);

            //Add image if exists
            $logo = $request->input('logo');
            if($logo && isset($logo['base64_image'])){
                $newLogo = Helpers::save_image($logo, 'logo', "logo_" . $company->id);
                if($newLogo)
                    $company->update(["logo" => $newLogo]);
            }

            /**
             * Creating New user for this new Provider
             */

            // Getting role Provider Admin for new user like a owner of this provider company.
            $role = Role::where("type", "admin")->first();

            // Setting Password Hash
            $user_data["password"] = app('hash')->make($request->input("password")); 

            // Setting the new Provider ID
            $user_data["company_id"] = $company->id;

            // Creation New user
            $user = User::create($user_data);
            
            // Send Welcome email
            $user->notify( new WelcomeMessage() );

            // Setting the role
            $user->roles()->sync([$role->id]);

            // Set this new user like owner by this new company.
            $company->update([ "owner_id" => $user->id]);

            return $this->respond(Response::HTTP_CREATED, ["company" => $company, "user" => $user]);
        }catch(HttpResponseException $e){
            // Return Exception Errors
            return $e->getResponse();
        }catch(\ErrorException $e) {
            // Return Exception Errors
            return response()->json(["error" => [$e->getLine(), $e->getMessage()]], 500);
        }
    }


    public function put(Request $request, $id)
    {
        try{
            $m = self::MODEL;
            Helpers::validate($request, $m::$rules, $m::$messages);
            
            //Control access by type user.
            if( !$this->user->hasRoles(["root", "admin"]) )
                return $this->isUnauthorized();

            $model = $m::find($id);

            //Find or fail
            if(is_null($model))
                return $this->respond(Response::HTTP_NOT_FOUND);
    
            $data = $request->only(['address', 'cuit', 'email', 'name', 'phone', 'slug']);

            //Add image if exists
            $logo = $request->input('logo');
            if($logo && isset($logo['base64_image'])){
                $newLogo = Helpers::save_image($logo, 'logo', "logo_" . $id);
                if($newLogo)
                    $data["logo"] = $newLogo;
            }

            $model->update($data);
            return $this->respond(Response::HTTP_OK, $model);
        }catch(HttpResponseException $e){
            return $e->getResponse();
        }catch(\ErrorException $e) {
            return response()->json(["error" => [$e->getLine(), $e->getMessage()]], 500);
        }
    }
}