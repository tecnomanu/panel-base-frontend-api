<?php
namespace App\Libraries;

use Carbon\Carbon;
use GrahamCampbell\Flysystem\Facades\Flysystem;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;

class Helpers
{
    public static function save_image($image, $dir, $name)
    {
        try {
            $exist = false;
            $path_file = $image;
            $path_thumb_file = null;
            if (isset($image["base64_image"])) {
                $name = Str::snake($name);
                $name = Str::ascii($name);
                $extension = isset($image["type"]) &&
                ($image["type"] == "image/jpeg" ||
                    $image["type"] == "image/jpg" ||
                    $image["type"] == "image/webp" ) ? ".jpg" : ".png";

                $image_name = $name . "_". Carbon::now()->timestamp . $extension;

                $path_file = $dir . '/' . $image_name;
                $path_thumb_file = $dir . '/thumb_' . $image_name;

                if(!Flysystem::has($dir))
                    Flysystem::createDir($dir);

                //General Image Vars
                $fileByBase64 = file_get_contents($image["base64_image"]);
                
                //Original
                $img = Image::make($fileByBase64)->resize(200, null, function ($constraint){
                    $constraint->aspectRatio();
                    $constraint->upsize();
                })->stream()->detach();
                //})->save($path_file);
                Flysystem::put($path_file, $img);

                //Thumbnails
                $thumb = Image::make($fileByBase64)->resize(128, 128, function ($constraint) {
                    $constraint->aspectRatio();
                })->stream()->detach();
                //})->save($path_thumb_file);
                Flysystem::put($path_thumb_file, $thumb);

                

                $exist = true;
            }
            return $exist ? ["image" => $path_file, "thumb" => $path_thumb_file] : false;

        } catch (\ErrorException $e) {
            $error =  $e->getMessage();
            $request = response()->json($error, 500);
            throw new HttpResponseException($request);
        }
    }

    public static function save_file($file, $dir, $name)
    {
        try {
            $path = false;
            if (isset($file["base64_file"])) {
                $path = 'files/' . $dir . '/' . $name;
                $file_data_sheet = file_get_contents($file["base64_file"]);
                file_put_contents(app()->public_path . '/' . $path, $file_data_sheet);
            }
            return $path;
        } catch (\ErrorException $e) {
            return $e->getMessage();
        }
    }

    public static function validate($request, $rules, $messages = [])
    {
        $data_validator = method_exists($request, 'all') ? $request->all() : $request;
        $validator = Validator::make($data_validator, $rules, $messages);
        if ($validator->fails()) {
            $errors = $validator->errors()->getMessages();
            $request = response()->json($errors, 422);
            throw new HttpResponseException($request);
        }
    }

    public static function paginate($items, $perPage = 15, $page = 1, $options = [])
    {
        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
        $items = $items instanceof Collection ? $items : Collection::make($items);
        $itemsParse = $items->forPage($page, $perPage);
        $values = $itemsParse->values();
        return new LengthAwarePaginator($values->all(), $items->count(), $perPage, $page, $options);
    }
}