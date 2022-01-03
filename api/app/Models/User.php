<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Jenssegers\Mongodb\Eloquent\SoftDeletes as SoftDeletes;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Eloquent implements JWTSubject, AuthenticatableContract, AuthorizableContract
{
    use Notifiable;
    use Authenticatable, Authorizable;
    use SoftDeletes;
    protected $dates = ['deleted_at'];

    protected $fillable = ["first_name", "last_name", "gender", "username", "email", "birthday", "avatar", "capability", "password", "company_id", 'verified_at', 'verification_code'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'role_id',
        'verified_at',
        'verification_code'
    ];

    protected $casts = [
        'verified_at' => 'datetime',
        'birthday' => 'datetime',
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
        'email' => [
            'required' => 'El email es requerido',
            'unique' => 'El email ya esta siendo usado',
            'email' => 'El correo electronico no es valido',
        ],
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
        return $this->belongsToMany( "App\Models\Role", "user_role", "user_id", "role_id");
    }

    public function company(){
        return $this->belongsTo( "App\Models\Company");
    }

    public function provider(){
        return $this->belongsTo( "App\Models\Sales\Provider");
    }

    //Functions
//    public function getRelationshipsAttributes(){
//        //$this->owner;
//    }

    public function hasCapability($type, $value = null) {
        $capability = $this->capability && $this->capability[$type] ? $this->capability[$type] : null;
        return $capability ?
            ($value !== null ? $capability == $value : $capability) : false;
    }

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
}
