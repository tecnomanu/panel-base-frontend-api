# Panel Administrador Base creado con Angular + Lumen + JWT
## Akveo Nebular + Lumen 8 + JWT 1.0-rc4 + MongoDB

[![License](https://tecnomanu.com.ar/wp-content/uploads/2017/03/manucloud_creador.png)](https://tecnomanu.com.ar)
[![License](https://poser.pugx.org/laravel/lumen-framework/license.svg)](https://opensource.org/licenses/MIT)

Este repositorio cuenta con la version de Lumen 8 + JWT 1.0-rc4 para login de usuario y un frontpanel con Nebular, listo para clonar e iniciar todos tus proyectos.

### ¿Qué incluye?
- Panel administrativo con:
    - Dashboard dummy orientado al ecommerce (útil para cualquier otra area)
    - Menu de Empresas, podras administrar las empresas como grupos de trabajos.
    - Menu de Usuario, lista, crea, edita o elimina los usuarios que estarán enlazados a empresas.
    - Pantalla de Login, Logout, Singup y validación de ususario por codigo via email.

- API Rest:
    - Semillas para iniciar tu proyecto con Root y empresa base.
    - Modulo de Usuarios (Model, Controller, Routes) tipo CRUD.
    - Modulo de Empresas (Model, Controller, Routes) tipo CRUD.
    - Modulo de Roles (Model, Controller, Routes) solo lectura.
    - Middleware para Login de usuarios por método JWT (token bearer).
    - Endpoints basados en version, para poder aplicar versiones nuevas en caso de ser necesario.
    - Trail RestAction para poder crear Controller simples con pre-funciones tipo CRUD.

### Documentación de Repositorios utilizados
- Panel
    - [Nebular](https://akveo.github.io/nebular/docs/getting-started/what-is-nebular?utm_campaign=nebular%20-%20home%20-%20nebular%20github%20readme&utm_source=nebular&utm_medium=referral&utm_content=documentation)
    
- APIRest
    - [Lumen](https://lumen.laravel.com/docs)
    - [JWT-Auth](https://github.com/tymondesigns/jwt-auth/wiki)

### Instalación y configuración

1. Ingresar a 'panel' e instalar las dependencias de Angular:
```sh
cd panel && npm install
```

2. Ahora ingresamos a la carpeta 'api', en la raiz del proyecto e instalamos las dependencias de Lumen:
```sh
cd ../api
composer update
```

3. Rellenar tu archivo .env con los datos de tu base de datos (basado en MongoDB) para poder instalar las semillas con el siguiente comando:
```sh
php artisan db:seed
```

4. Hacer symlink de storage a public, para poder mostrar las imagenes que se vayan creando en el storage.
```
mkdir storage/app/public
ln -s ../storage/app/public public/storage
````
> En el archivo de configuración 'api/config/filesystem' se puede configurar otras rutas y otros servicios como Amazon S3

5. Esta todo casi listo, solo queda correr el servicio en localhost para crear el API_KEY que llevaría el env y listo:
```sh
php -S localhost:8000 -t public
```

6. Una vez iniciado el servidor del respositorio, ingresa a la ruta http://localhost:8000/key para copiar la clave de 32 chars y luego pegarlo en tu archivo .env (APP_KEY).

7. Listo! Configura tu Lumen y Panel a gusto.

### License
[MIT](https://github.com/tecnomanu/ngxadmin-lumen-jwtlogin-base/blob/master/LICENSE.txt) license.

[![N|Solid](http://tecnomanu.com.ar/wp-content/uploads/2017/03/manucloud_createby.png)](https://manu.cloud)

## Nebular
[Documentation](https://akveo.github.io/nebular/docs/getting-started/what-is-nebular?utm_campaign=nebular%20-%20home%20-%20nebular%20github%20readme&utm_source=nebular&utm_medium=referral&utm_content=documentation)
Nebular is a customizable Angular 10 UI Library with a focus on beautiful design and ability to adapt it to your brand easily. It comes with 4 stunning visual themes, a powerful theming engine with runtime theme switching and support of custom css properties mode. Nebular is based on Eva Design System specifications.

# Creditos y Plataformas
### Ngx-Admin by Akeveo [Repositorio](https://github.com/akveo/ngx-admin)
### Nebular by Akeveo [Repositorio]("https://akveo.github.io/nebular)
### Lumen PHP Framework [Repositorio](https://github.com/laravel/lumen-framework)
### JWT-AUTH by tymondesigns[Repositorio](https://github.com/tymondesigns/jwt-auth)


# Estados de los repositorios

## Ngx-Admin by Akeveo
[![Build Status](https://travis-ci.org/akveo/ngx-admin.svg?branch=master)](https://travis-ci.org/akveo/ngx-admin)
[![Join the chat at https://gitter.im/ng2-admin/Lobby](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ng2-admin/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# Nebular by Akeveo
[![Build Status](https://travis-ci.org/akveo/nebular.svg?branch=master)](https://travis-ci.org/akveo/nebular)

# Lumen PHP Framework
[![Build Status](https://travis-ci.org/laravel/lumen-framework.svg)](https://travis-ci.org/laravel/lumen-framework)
[![Total Downloads](https://poser.pugx.org/laravel/lumen-framework/d/total.svg)](https://packagist.org/packages/laravel/lumen-framework)
[![Latest Stable Version](https://poser.pugx.org/laravel/lumen-framework/v/stable.svg)](https://packagist.org/packages/laravel/lumen-framework)
[![Latest Unstable Version](https://poser.pugx.org/laravel/lumen-framework/v/unstable.svg)](https://packagist.org/packages/laravel/lumen-framework)
[![License](https://poser.pugx.org/laravel/lumen-framework/license.svg)](https://packagist.org/packages/laravel/lumen-framework)

# JWT-AUTH by tymondesigns
[![Build Status](http://img.shields.io/travis/tymondesigns/jwt-auth/master.svg?style=flat-square)](https://travis-ci.org/tymondesigns/jwt-auth)
[![Codecov branch](https://img.shields.io/codecov/c/github/tymondesigns/jwt-auth/develop.svg?style=flat-square)](https://codecov.io/github/tymondesigns/jwt-auth)
[![Latest Version](http://img.shields.io/packagist/v/tymon/jwt-auth.svg?style=flat-square)](https://packagist.org/packages/tymon/jwt-auth)
[![Latest Dev Version](https://img.shields.io/packagist/vpre/tymon/jwt-auth.svg?style=flat-square)](https://packagist.org/packages/tymon/jwt-auth#dev-develop)
[![Monthly Downloads](https://img.shields.io/packagist/dm/tymon/jwt-auth.svg?style=flat-square)](https://packagist.org/packages/tymon/jwt-auth)
