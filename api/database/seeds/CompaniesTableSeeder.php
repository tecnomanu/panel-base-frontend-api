<?php

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Seeder;

class CompaniesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::where("username", "root")->first();

        $company = Company::where("slug", "panel_base")->first();

        if(!$company && $user){
            $company =  Company::create([
                'name' => 'PanelBase',
                'slug' => "PanelBase",
                'owner_id' => $user->id,
                'email' => $user->email,
                'phone' => "",
                'url' => "",
                'address' => "",
                'logo' => "",
                'created_at' => \Carbon\Carbon::now()->toDateString(),
                'updated_at' => \Carbon\Carbon::now()->toDateString()
            ]);
        }
        
        if($company && $user)
            $user->update(["company_id" => $company->id]);
    }
}
