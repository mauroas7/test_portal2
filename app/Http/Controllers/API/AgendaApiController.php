<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\AgendaDetailResource;
use App\Services\AgendaService;


class AgendaApiController extends Controller
{
    public function show(
        int $id,
        AgendaService $agendaService
    ) {
        $agenda = $agendaService->getAgendaById($id);

        if (!$agenda) {
            return response()->json([
                'message' => 'Agenda no encontrada'
            ], 404);
        }

        return new AgendaDetailResource($agenda);
    }
}
