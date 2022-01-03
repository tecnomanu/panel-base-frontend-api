<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Token extends Eloquent
{
    protected $fillable = ["user_id", "access_token", "refresh_token", "expires_in"];
}
