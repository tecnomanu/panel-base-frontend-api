<?php namespace App\Models\Sales;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Jenssegers\Mongodb\Eloquent\SoftDeletes as SoftDeletes;

class Membership extends Eloquent {

    use SoftDeletes;
    protected $dates = ['deleted_at'];
    
    protected $fillable = ["name", "type"];

    public static $rules = [
        "name" => "required",
        "type" => "required",
    ];

    public $timestamps = false;

    //Append news Attributes;
    protected $appends = ['text'];


    public function getTextAttribute()
    {
        return $this->name;
    }

    //RelationShips
    public function company()
    {
        return $this->hasMany("App\Models\Company");
    }

    //Functions
    public function getRelationshipsAttributes(){
        $this->company;
    }

}
