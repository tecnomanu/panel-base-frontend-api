<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class RolesController extends Controller
{

    const MODEL = "App\Models\Role";

    use RESTActions;

    protected $user;

    public function __construct()
    {
        $this->user = Auth::user();
    }

    public function all(Request $request)
    {
        $this->user = $this->jwt->parseToken()->authenticate();
        try {
            //Queries
            $per_page = $request->get("per_page") ? (int) $request->get("per_page") : 10;
            $order = $request->get("order") ? $request->get("order") : 'desc';
            $order_by = $request->get("order_by") ? $request->get("order_by") : '_id';
            $search = $request->get("q");

            //Model to get fillables
            $m = self::MODEL;
            $newM = new $m();

            //model to search results
            $model = self::MODEL;

            //Function query
            $result = $model::orderBy($order_by, $order)
                ->where(function ($query) {
                    if (!$this->user->hasRole("root")) {
                        $query->where('type', "!=", "root");
                        if ($this->user->hasRole("user"))
                            $query->where('type', "!=", "admin");
                    }
                })
                ->where(function ($query) use ($search, $newM) {
                    if ($search) {
                        foreach ($newM->getFillable() as $column) {
                            if ($column != '_id')
                                $query->orWhere($column, 'like', '%' . $search . '%');
                        }
                    }
                })
                ->paginate($per_page);

            return $this->respond(Response::HTTP_OK, $result);
        } catch (\ErrorException $e) {
            return response()->json(["error" => [$e->getLine(), $e->getMessage()]], 500);
        }
    }
}
