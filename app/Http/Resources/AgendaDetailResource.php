<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AgendaDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => data_get($this, 'id'),

            'dia' => data_get(
                $this,
                'attributes.dia'
            ),

            'hora_inicio' => data_get(
                $this,
                'attributes.horaInicio'
            ),

            'hora_fin' => data_get(
                $this,
                'attributes.horaFin'
            ),

            'inicio_vigencia' => data_get(
                $this,
                'attributes.inicioVigencia.date'
            ),

            'fin_vigencia' => data_get(
                $this,
                'attributes.finVigencia.date'
            ),

            'duracion_turno' => data_get(
                $this,
                'attributes.duracionTurno'
            ),

            'limite_pacientes' => data_get(
                $this,
                'attributes.limitePacientes'
            ),

            'cantidad_turnos' => data_get(
                $this,
                'attributes.cantidadTurnos'
            ),

            'profesional' => new ProfesionalResource(
                $this['profesional_completo']
            ),

            'especialidad' => new EspecialidadResource(
                $this['especialidad_completa']
            ),
        ];
    }
}
