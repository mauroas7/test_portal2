<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\TurnoPacienteResource;
use App\Services\TurnoService;

class PersonaTurnosApiController extends Controller
{
    public function index(
        Request $request,
        int $id,
        TurnoService $turnoService
    ) {
        $estado = $request->query('estado');
        $turnos = $turnoService
            ->getTurnosByPersonaId($id, $estado);

        return TurnoPacienteResource::collection($turnos);
    }
}
