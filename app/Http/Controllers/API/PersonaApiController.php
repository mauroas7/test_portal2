<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\PersonaService;
use App\Http\Resources\PersonaResource;

class PersonaApiController extends Controller
{
    public function index(\Illuminate\Http\Request $request, \App\Services\PersonaService $service)
    {
        $filters = $request->only(['nombre', 'apellido']);

        $personas = $service->getPersonas($filters);

        return \App\Http\Resources\PersonaResource::collection($personas);
    }

    public function show($id, PersonaService $service)
    {
        $persona = $service->getPersonaById($id);

        if (!$persona) {
            return response()->json([
                'error' => 'Persona no encontrada'
            ], 404);
        }

        return new PersonaResource($persona);
    }
}
