<?php

use App\Models\Company;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        $user = User::where("username", "root")->first();
        $company = Company::where("slug", "panel_base")->first();

        if(!$user){

            $user = User::create([
                'first_name' => 'Admin',
                'last_name' => 'Admin',
                'password' => app('hash')->make('12345678'),
                'email' => 'root@root.com',
                'username' => 'root',
                'verified_at' => \Carbon\Carbon::now()->toDateString() , 
                'verification_code' =>  sha1(Str::random(32)),
                'company_id' => $company ? $company->_id : null
            ]);

            $role =  Role::where("name", "Root")->first();
            $user->roles()->attach($role);

        }else if($user && $company){
            $user->update(["company_id" => $company->_id]);
        }
    }    
}