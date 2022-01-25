<?php namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Jenssegers\Mongodb\Eloquent\SoftDeletes as SoftDeletes;

class Company extends Eloquent {

    use SoftDeletes;

    protected $fillable = ["name", "slug", "cuit", "address", "logo", "email", "phone", "owner_id"] ;

    protected $dates = [];

    public static $rules = [
        "name" => "required",
    ];

    public static $messages = [
        'name' => 'El nombre es requerido',
    ];

    //Append news Attributes;
    protected $appends = ['text'];


    public function getTextAttribute()
    {
        return $this->name;
    }
    
    // public function membership()
    // {
    //     return $this->belongsTo("App\Models\Membership");
    // }

    public function owner(){
        return $this->hasOne(User::class, '_id', 'owner_id');
    }
    
    public function users(){
        return $this->belongsTo(User::class);
    }

    //Functions
    public function getRelationshipsAttributes(){
        $this->membership;
    }

}
