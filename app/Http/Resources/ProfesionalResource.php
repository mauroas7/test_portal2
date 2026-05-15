<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfesionalResource extends JsonResource
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

            'legajo' => data_get(
                $this,
                'attributes.legajo'
            ),

            'matricula_nacional' => data_get(
                $this,
                'attributes.matriculaNacional'
            ),

            'matricula_provincial' => data_get(
                $this,
                'attributes.matriculaProvincial'
            ),

            'persona' => new PersonaResource(
                $this['persona_completa']
            ),
            
        ];
    }
}
