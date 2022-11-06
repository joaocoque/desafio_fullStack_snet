<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class BaseController extends Controller
{
    public function notFoundResponse()
    {
        return response()->json([
            'message' => 'Nenhum resultado encontrado.'
        ], 204);
    }
}
