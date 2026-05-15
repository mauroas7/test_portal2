<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EstadoTurnoResource extends JsonResource
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

            'nombre' => data_get(
                $this,
                'attributes.nombre'
            ),

            'codigo' => data_get(
                $this,
                'attributes.codigo'
            ),

            'color' => data_get(
                $this,
                'attributes.color'
            ),
        ];
    }
}
