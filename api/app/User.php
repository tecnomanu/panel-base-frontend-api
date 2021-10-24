<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Jenssegers\Mongodb\Eloquent\SoftDeletes as SoftDeletes;

class User extends Eloquent implements JWTSubject, AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;
    use SoftDeletes;
    protected $dates = ['deleted_at'];

    protected $fillable = ["first_name", "last_name", "gender", "username", "email", "birthday", "avatar", "password", "company_id"];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'role_id',
        'tasting_ids'
    ];


    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public static $rules = [
        "first_name" => "required",
        "email" => "required|email",
        "username" => "required|unique:users"
    ];

    public static $messages = [
        'first_name' => 'El nombre es requerido',
        'email' => 'El email es requerido',
        'username.required' => 'El nombre de usuario es requerido',
        'username.unique' => 'El nombre de usuario ya existe, elija otro.',
    ];

    protected $appends = ['text', 'role', 'role_name'];

    public function getTextAttribute(){
        return $this->first_name . " " . $this->last_name;
    }

    public function getRoleAttribute(){
        $role = $this->roles()->first();
        return $role ? $role->type : null;
    }

    public function getRoleNameAttribute(){
        $role = $this->roles()->first();
        return $role ? $role->name : null;
    }

    //RelationShips

    public function roles(){
        return $this->belongsToMany( "App\Role", "user_role", "user_id", "role_id");
    }

    public function company(){
        return $this->belongsTo( "App\Company");
    }

    public function provider(){
        return $this->belongsTo( "App\Provider");
    }

    //Functions
//    public function getRelationshipsAttributes(){
//        //$this->owner;
//    }

    public function hasRole($role){
        return $this->hasRoles([$role]);
    }
        
    public function hasRoles($roles)
    {
        foreach ($roles as $role){
            if($this->roles()->get()->contains("type", $role))
                return true;
        }
        return false;
    }
    
    public function canAssignRole($role, $auth_role){
        return $auth_role != "root" &&
        (
            $role["type"] == "root" ||
            $role["type"] == "admin" ||
            ($role["type"] == "provider" && $auth_role != "admin") ||
            ($role["type"] != "manager" && $role["type"] != "supplier" && $auth_role == "client") ||
            ($role["type"] != "supplier" && $auth_role == "manager") ||
            $auth_role == "supplier"
        );
    }
}
