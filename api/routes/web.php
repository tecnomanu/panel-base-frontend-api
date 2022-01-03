<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/
global $app;
use Illuminate\Support\Facades\Route;

//Special Function to make resources
function rest($path, $controller)
{
    global $app;

    $app->router->get($path, $controller.'@all');
    $app->router->get($path.'/{id}', $controller.'@get');
    $app->router->post($path, $controller.'@add');
    $app->router->put($path.'/{id}', $controller.'@put');
    $app->router->delete($path.'/{id}', $controller.'@remove');
    $app->router->delete($path.'/{id}/destroy', $controller.'@destroy');
    $app->router->get($path.'/{id}/clone', $controller.'@replicate');
}

//Root of lumen
Route::get('/', function () use($app){
    return $app->version();
});

//Function to generate a random Key
Route::get('/key', function() {
    return str_random(32);
});

Route::group(['prefix' => 'api/v1'], function($router)
{
    //Fix to Method OPTIONS
    Route::options('/{any:.*}', function () {
        return response(['status' => 'success'])->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods','OPTIONS, GET, POST, PUT, DELETE')
            ->header('Access-Control-Allow-Headers', 'Authorization, Content-Type, Origin');
    });

    Route::group(['prefix' => 'auth', 'namespace' => 'Auth'], function($router)
    {
        Route::post('/login', 'AuthController@login');
        Route::post('/register', 'AuthController@register');
        Route::post('/logout', 'AuthController@logout');
        Route::post('/request-password', 'AuthController@requestPassword');
        Route::put('/reset-password', 'AuthController@resetPassword');
        Route::group(['prefix' => 'verify'], function($router)
        {
            Route::post('/', 'AuthController@verifyEmail');
            Route::group(['middleware' => 'auth:api'], function($router)
            {
                Route::get('/send', 'AuthController@sendVerificationEmail');
            });
        });
    });

    Route::group(['middleware' => ['auth:api','verify']], function($router)
    {
        Route::get('/me/data', 'UsersController@getSelfData');

        Route::group(['prefix' => 'admin'], function($router)
        {
            rest('user', 'UsersController');
            rest('company', 'CompaniesController');
            rest('role', 'RolesController');
        });        
    });
});