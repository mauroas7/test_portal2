<?php

namespace App\Contracts;

/**
 * Este es el contrato. Define QUÉ debe hacer el sistema,
 * pero no CÓMO lo hace (si con SQL o con una API).
 */
interface TurnoRepositoryInterface
{
    public function getProximosTurnos($pacienteId);
    public function solicitarTurno(array $datos);
}