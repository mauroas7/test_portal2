<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AgendaResource extends JsonResource
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

            'hora_inicio' => data_get(
                $this,
                'attributes.horaInicio'
            ),

            'hora_fin' => data_get(
                $this,
                'attributes.horaFin'
            ),

            'duracion_turno' => data_get(
                $this,
                'attributes.duracionTurno'
            ),

            'piso' => data_get(
                $this,
                'attributes.piso'
            ),
        ];
    }
}
