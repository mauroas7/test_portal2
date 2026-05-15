<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use App\Services\PersonaService;

class ProfesionalService
{

    protected $personaService;

    public function __construct(PersonaService $personaService)
    {
        $this->personaService = $personaService;
    }

    public function getProfesionalById($id)
    {
        $response = Http::withOptions([
            'verify' => false,
        ])->withBasicAuth(
            config('services.alephoo.user'),
            config('services.alephoo.password')
        )->get(
            config('services.alephoo.base_url') . "/admin/profesionales/{$id}"
        );

        if ($response->failed()) {
            return null;
        }

        $data = $response->json();

        $personal = $data['data'];

        // Obtener persona ID
        $personaId = data_get(
            $personal,
            'relationships.persona.data.id'
        );

        // Buscar persona en included
        $persona = collect($data['included'])->first(function ($item) use ($personaId) {
            return $item['type'] === 'Admin\\Persona'
                && $item['id'] == $personaId;
        });

        // Agregar persona completa
        $personal['persona_completa'] = $persona;

        return $personal;
    }

    public function getProfesionalDetailById($id)
    {
        $response = Http::withOptions([
            'verify' => false,
        ])->withBasicAuth(
            config('services.alephoo.user'),
            config('services.alephoo.password')
        )->get(
            config('services.alephoo.base_url') . "/admin/profesionales/{$id}"
        );

        if ($response->failed()) {
            return null;
        }

        $data = $response->json();
        $personal = $data['data'];

        // Obtener persona ID
        $personaId = data_get(
            $personal,
            'relationships.persona.data.id'
        );
        
        $persona = $this->personaService->getPersonaById($personaId);
        $personal['persona_completa'] = $persona;

        return $personal;
    }
}
