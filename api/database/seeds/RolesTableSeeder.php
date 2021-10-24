<?php

use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert(['name' => 'Root', 'type' => 'root', 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()->toDateString()]);
        DB::table('roles')->insert(['name' => 'Admin', 'type' => 'admin',  'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()->toDateString()]);
        DB::table('roles')->insert(['name' => 'Usuario', 'type' => 'user',  'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()->toDateString()]);
    }
}
