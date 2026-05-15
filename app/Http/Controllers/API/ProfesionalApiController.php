<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\ProfesionalResource;
use App\Services\ProfesionalService;
use App\Http\Resources\ProfesionalDetailResource;

class ProfesionalApiController extends Controller
{
    public function show(
        int $id,
        ProfesionalService $profesionalService
    ) {
        $profesional = $profesionalService->getProfesionalById($id);

        if (!$profesional) {
            return response()->json([
                'message' => 'Profesional no encontrado'
            ], 404);
        }

        return new ProfesionalResource($profesional);
    }

    public function detail(
        int $id,
        ProfesionalService $profesionalService
    ) {
        $profesional = $profesionalService
            ->getProfesionalDetailById($id);

        if (!$profesional) {
            return response()->json([
                'message' => 'Profesional no encontrado'
            ], 404);
        }

        return new ProfesionalDetailResource($profesional);
    }
}
