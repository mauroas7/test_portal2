<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TurnoResource extends JsonResource
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

            'fecha' => data_get(
                $this,
                'attributes.fecha'
            ),

            'hora' => data_get(
                $this,
                'attributes.hora'
            ),

            'observacion' => data_get(
                $this,
                'attributes.observacion'
            ),

            'estado' => new EstadoTurnoResource(
                $this['estado_completo']
            ),

            'agenda' => new AgendaResource(
                $this['agenda_completa']
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
