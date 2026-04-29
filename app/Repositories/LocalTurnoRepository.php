<?php

namespace App\Repositories;

use App\Contracts\TurnoRepositoryInterface;
use App\Models\Turno;

class LocalTurnoRepository implements TurnoRepositoryInterface
{
    public function getProximosTurnos($pacienteId)
    {
        // Por ahora, consultamos tu base de datos local
        return Turno::where('user_id', $pacienteId)
            ->where('fecha_hora', '>=', now())
            ->orderBy('fecha_hora', 'asc')
            ->get();
    }

    public function solicitarTurno(array $datos)
    {
        return Turno::create($datos);
    }
}