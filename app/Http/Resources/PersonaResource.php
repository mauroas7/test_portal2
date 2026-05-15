<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PersonaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'id' => $this['id'] ?? null,

            'nombre' => data_get($this, 'attributes.nombres'),

            'apellido' => data_get($this, 'attributes.apellidos'),

            'documento' => data_get($this, 'attributes.documento'),

            'nombre_completo' => trim(
                ($this['attributes']['nombres'] ?? '') . ' ' .
                    ($this['attributes']['apellidos'] ?? '')
            ),

            'telefono' => data_get($this, 'attributes.telefono'),

            'email' => data_get($this, 'attributes.email'),

            'fechaNacimiento' => data_get($this, 'attributes.fechaNacimiento'),

            'sexo' => data_get($this, 'attributes.sexo'),

            'obra_social' => [
                'id' => data_get($this, 'plan.id'),
                'nombre' => data_get($this, 'plan.attributes.nombre'),
            ],

            'direccion' => [
                'calle' => data_get(
                    $this,
                    'direccion_completa.attributes.calle'
                ),

                'numero' => data_get(
                    $this,
                    'direccion_completa.attributes.nro'
                ),

                'piso' => data_get(
                    $this,
                    'direccion_completa.attributes.piso'
                ),

                'departamento' => data_get(
                    $this,
                    'direccion_completa.attributes.depto'
                ),
                'ciudad' => data_get(
                    $this,
                    'direccion_completa.attributes.ciudad'
                ),
            ],
        ];
    }
}
