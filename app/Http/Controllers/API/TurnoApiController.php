<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\TurnoResource;
use App\Services\TurnoService;

class TurnoApiController extends Controller
{
    public function show(
        int $id,
        TurnoService $turnoService
    ) {
        $turno = $turnoService->getTurnoById($id);

        if (!$turno) {
            return response()->json([
                'message' => 'Turno no encontrado'
            ], 404);
        }

        return new TurnoResource($turno);
    }
}
