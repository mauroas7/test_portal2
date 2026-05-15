<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class PersonaService
{
    public function getPersonas()
    {
        $response = Http::withOptions([
            'verify' => false,
        ])->withBasicAuth(
            config('services.alephoo.user'),
            config('services.alephoo.password')
        )->get(
            config('services.alephoo.base_url') . '/admin/personas/ID'
        );

        if ($response->failed()) {
            return null;
        }

        $data = $response->json();
        return $data['data'] ?? null;
    }

    public function getPersonaById($id)
    {
        $response = Http::withOptions([
            'verify' => false,
        ])->withBasicAuth(
            config('services.alephoo.user'),
            config('services.alephoo.password')
        )->get(
            config('services.alephoo.base_url') . "/admin/personas/{$id}"
        );

        if ($response->failed()) {
            return null;
        }

        $data = $response->json();
        $persona = $data['data'];

        // Obtener PersonaPlan ID
        $personaPlanId = data_get(
            $persona,
            'relationships.personaPlanesActivos.0.data.id'
        );

        // Consultar PersonaPlan
        $personaPlan = Http::withOptions([
            'verify' => false,
        ])->withBasicAuth(
            config('services.alephoo.user'),
            config('services.alephoo.password')
        )->get(
            config('services.alephoo.base_url') . "/admin/personaPlanes/{$personaPlanId}"
        )->json();

        // Obtener Plan ID desde PersonaPlan
        $planId = data_get(
            $personaPlan,
            'data.relationships.plan.data.id'
        );

        // Consultar Plan
        $plan = Http::withOptions([
            'verify' => false,
        ])->withBasicAuth(
            config('services.alephoo.user'),
            config('services.alephoo.password')
        )->get(
            config('services.alephoo.base_url') . "/admin/Planes/{$planId}"
        )->json();

        // Agregar plan a persona
        $persona['plan'] = $plan['data'] ?? null;

        // Obtener direccion
        $direccionId = data_get(
            $persona,
            'relationships.direccion.data.id'
        );

        $direccion = collect($data['included'])->firstWhere(
            'id',
            $direccionId
        );

        $persona['direccion_completa'] = $direccion;

        return $persona;
    }
}
