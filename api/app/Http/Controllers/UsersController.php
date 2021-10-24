<?php namespace App\Http\Controllers;

use App\Libraries\Helpers;
use App\Role;
use App\User;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Tymon\JWTAuth\JWTAuth;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UsersController extends Controller {

    const MODEL = "App\User";

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
                ->where(function ($query) use($search) {
                    $query->where('company_id', $this->user->company_id);
                })
                ->where(function ($query) use($search, $newM) {
                    if($search){
                        foreach($newM->getFillable() as $column)
                        {
                            if($column != '_id')
                                $query->orWhere($column, 'like', '%'.$search.'%');
                        }
                    }
                })->with("provider")->paginate($per_page);

            return $this->respond(Response::HTTP_OK, $result);
        }catch(\ErrorException $e) {
            return response()->json(["error" => [$e->getLine(), $e->getMessage()]], 500);
        }
    }

    public function get($id)
    {
        try{
            $m = self::MODEL;
            $model = $m::find($id);
            if(is_null($model))
                return $this->respond(Response::HTTP_NOT_FOUND);

            $model->provider;

            return $this->respond(Response::HTTP_OK, $model);
        }catch(\ErrorException $e) {
            return response()->json(["error" => [$e->getLine(), $e->getMessage()]], 500);
        }
    }

    public function add(Request $request)
    {
        try{
            $m = self::MODEL;

            $rules =  User::$rules;
            $rules["username"] = [
                "required",
                Rule::unique('users')->where(function ($query) {return $query->whereNull('deleted_at');})
            ];

            Helpers::validate($request, $rules, $m::$messages);

            $data = $request->all();

            if(!$this->user->hasRoles(["root", "admin"]) && $data["role"] == "root")
                return $this->isUnauthorized();

            if($data["password"] != $data["confirmation_password"])
                return response()->json(['password' => ['Los passwords ingresados no coinciden.']], 422);

            $data["password"] = app('hash')->make($data["password"]);

            $user = $m::create($data);

            if($data["role"]){
                $role = \App\Role::where("type", $data["role"])->first();
                if($role)
                    $user->roles()->attach($role);
            }

            return $this->respond(Response::HTTP_CREATED, $user);
        }catch(HttpResponseException $e){
            return $e->getResponse();
        }
    }

    public function put(Request $request, $id)
    {
        try{
            $m = self::MODEL;
            $rules =  User::$rules;
            $rules["username"] = "required";
            Helpers::validate($request, $rules, $m::$messages);
            $user = $m::find($id);
            $data = $request->all();

            //Find or fail
            if(is_null($user))
                return $this->respond(Response::HTTP_NOT_FOUND);

            if(isset($data["password"])){
                if($data["password"] != $data["confirmation_password"])
                    return response()->json(['password' => ['Los passwords ingresados no coinciden.']], 422);

                $data["password"] = app('hash')->make($data["password"]);
            }
            
            if($data["role"]){
                
                if(!$this->user->hasRoles(["root", "admin"]) && $data["role"] == "root")
                    return $this->isUnauthorized();
                
                $role = \App\Role::where("type", $data["role"])->first();
                if($role)
                    $user->roles()->attach($role);
            }

            $user->update($data);
            return $this->respond(Response::HTTP_OK, $user);
        }catch(HttpResponseException $e){
            return $e->getResponse();
        }catch(\ErrorException $e) {
            return response()->json(["error" => [$e->getLine(), $e->getMessage()]], 500);
        }
    }

    public function getSelfData(){
        try{
            $user = $this->jwt->parseToken()->authenticate();
            $user->company;
            return response()->json($user);
        }catch(\Exception $e){
            return response()->json(["error" => [$e->getLine(),$e->getMessage()]], 500);
        }
    }

}
