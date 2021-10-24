<?php namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Jenssegers\Mongodb\Eloquent\SoftDeletes as SoftDeletes;

class Company extends Eloquent {

    use SoftDeletes;

    protected $fillable = ["name", "slug", "logo", "address", "phone", "url", "email"];

    protected $dates = [];

    public static $rules = [
        "name" => "required",
        "logo" => "required",
        "address" => "required",
        "phone" => "required",
        "url" => "required",
        "email" => "required,email",
    ];

    //Append news Attributes;
    protected $appends = ['text'];


    public function getTextAttribute()
    {
        return $this->name;
    }
    
    public function membership()
    {
        return $this->belongsTo("App\Membership");
    }
    
    public function users(){
        return $this->belongsTo('App\User');
    }

    public function locals(){
        return $this->belongsToMany('App\Local', "locals", "company_id", "_id");
    }

    //Functions
    public function getRelationshipsAttributes(){
        $this->membership;
    }

}
