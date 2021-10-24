<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

/**
 * Created by PhpStorm.
 * User: manuel
 * Date: 31/1/17
 * Time: 16:41
 */
class UsersTableSeeder extends Seeder
{
    public function run()
    {
        $user = \App\User::where("username", "root")->first();
        $company = \App\Company::where("slug", "panel_base")->first();

        if(!$user){

            $user =\App\User::create([
                'first_name' => 'Admin',
                'last_name' => 'Admin',
                'password' => app('hash')->make('12345678'),
                'email' => 'root@root.com',
                'username' => 'root',
                'company_id' => $company ? $company->_id : null
            ]);

            $role = \App\Role::where("name", "Root")->first();
            $user->roles()->attach($role);

        }else if($user && $company){
            $user->update(["company_id" => $company->_id]);
        }
    }    
}