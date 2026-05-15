<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TurnoPacienteResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            /* Datos básicos turno */
            'id' => data_get($this, 'id'),
            'fecha' => data_get(
                $this,
                'attributes.fecha'
            ),

            'hora' => data_get(
                $this,
                'attributes.hora'
            ),

            /* Estado */
            'estado' => [
                'nombre' => data_get(
                    $this,
                    'estado_completo.attributes.nombre'
                ),

                'color' => data_get(
                    $this,
                    'estado_completo.attributes.color'
                ),
            ],

            /* Profesional */
            'profesional' => [
                'id' => data_get(
                    $this,
                    'profesional_completo.id'
                ),

                'nombre_completo' =>
                data_get(
                    $this,
                    'profesional_completo.persona_completa.attributes.nombres'
                )
                    . ' ' .
                    data_get(
                        $this,
                        'profesional_completo.persona_completa.attributes.apellidos'
                    ),
            ],

            /* Especialidad */
            'especialidad' => [
                'id' => data_get(
                    $this,
                    'especialidad_completa.id'
                ),

                'nombre' => data_get(
                    $this,
                    'especialidad_completa.attributes.nombre'
                ),
            ],

            /* Lugar / sede */
            'lugar' => [
                'nombre' => data_get(
                    $this,
                    'agenda_completa.lugar_completo.attributes.nombre'
                ),

                'piso' => data_get(
                    $this,
                    'agenda_completa.attributes.piso'
                ),
            ],
        ];
    }
}
