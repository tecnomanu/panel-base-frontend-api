<?php

require_once __DIR__.'/../vendor/autoload.php';

try {
    (new Laravel\Lumen\Bootstrap\LoadEnvironmentVariables(
        dirname(__DIR__)
    ))->bootstrap();
} catch (Dotenv\Exception\InvalidPathException $e) {
    //
}

/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| Here we will load the environment and create the application instance
| that serves as the central piece of this framework. We'll use this
| application as an "IoC" container and router for this framework.
|
*/

$app = new Laravel\Lumen\Application(
    realpath(__DIR__.'/../')
);

$app->withFacades();

$app->register(Jenssegers\Mongodb\MongodbServiceProvider::class);

$app->withEloquent();

/*
|--------------------------------------------------------------------------
| Register Container Bindings
|--------------------------------------------------------------------------
|
| Now we will register a few bindings in the service container. We will
| register the exception handler and the console kernel. You may add
| your own bindings here if you like or you can make another file.
|
*/

$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    App\Exceptions\Handler::class
);

$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    App\Console\Kernel::class
);

/*
|--------------------------------------------------------------------------
| Register Middleware
|--------------------------------------------------------------------------
|
| Next, we will register the middleware with the application. These can
| be global middleware that run before and after each request into a
| route or middleware that'll be assigned to some specific routes.
|
*/

$app->middleware([
    'CorsMiddleware' => App\Http\Middleware\CorsMiddleware::class
]);

 $app->routeMiddleware([
     'auth' => App\Http\Middleware\Authenticate::class,
 ]);

 $app->routeMiddleware([
    'verify' => App\Http\Middleware\Verificate::class,
]);

/*
|--------------------------------------------------------------------------
| Register Service Providers
|--------------------------------------------------------------------------
|
| Here we will register all of the application's service providers which
| are used to bind services into the container. Service providers are
| totally optional, so you are not required to uncomment this line.
|
*/

//System
$app->register(App\Providers\AppServiceProvider::class);
$app->register(App\Providers\AuthServiceProvider::class);
$app->register(App\Providers\EventServiceProvider::class);
$app->register(App\Providers\CatchAllOptionsRequestsProvider::class);
$app->register(Illuminate\Notifications\NotificationServiceProvider::class);
$app->register(\Illuminate\Mail\MailServiceProvider::class);

//Vendors
$app->register(Tymon\JWTAuth\Providers\LumenServiceProvider::class);
$app->register(Intervention\Image\ImageServiceProviderLumen::class);

//Alias
$app->alias('mailer', \Illuminate\Contracts\Mail\Mailer::class);
$app->alias('Excel', \Maatwebsite\Excel\Facades\Excel::class);
$app->alias('mailer', \Illuminate\Contracts\Mail\Mailer::class);

//Alias
$app->alias('mailer', \Illuminate\Contracts\Mail\Mailer::class);
$app->alias('mail.manager', Illuminate\Mail\MailManager::class);
$app->alias('mail.manager', Illuminate\Contracts\Mail\Factory::class);
$app->alias('Notification', Illuminate\Support\Facades\Notification::class);

$app->register(GrahamCampbell\Flysystem\FlysystemServiceProvider::class);

$app->configure('mail');
$app->configure('filesystems');

/*
|--------------------------------------------------------------------------
| Load The Application Routes
|--------------------------------------------------------------------------
|
| Next we will include the routes file so that they can all be added to
| the application. This will provide all of the URLs the application
| can respond to, as well as the controllers that may handle them.
|
*/

$app->router->group([
    'namespace' => 'App\Http\Controllers',
], function ($router) {
    require __DIR__.'/../routes/web.php';
});

return $app;
