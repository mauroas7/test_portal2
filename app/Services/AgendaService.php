<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class AgendaService
{
    protected $profesionalService;

    public function __construct(
        ProfesionalService $profesionalService
    ) {
        $this->profesionalService = $profesionalService;
    }

    public function getAgendaById($id)
    {
        $response = Http::withOptions([
            'verify' => false,
        ])->withBasicAuth(
            config('services.alephoo.user'),
            config('services.alephoo.password')
        )->get(
            config('services.alephoo.base_url')
                . "/admision/agendas/{$id}"
        );

        if ($response->failed()) {
            return null;
        }

        $data = $response->json();
        $agenda = $data['data'];
        $included = collect($data['included']);

        /* Lugar */
        $lugarId = data_get(
            $agenda,
            'relationships.lugar.data.id'
        );

        $lugar = $included->first(function ($item) use ($lugarId) {

            return $item['type'] === 'Admin\\Lugar'
                && $item['id'] == $lugarId;
        });

        /* Asignacion */
        $asignacionId = data_get(
            $agenda,
            'relationships.asignacion.data.id'
        );

        $asignacion = $included->first(function ($item) use ($asignacionId) {
            return $item['type'] === 'Admin\\Asignacion'
                && $item['id'] == $asignacionId;
        });

        /* Profesional */
        $profesionalId = data_get(
            $asignacion,
            'relationships.profesional.data.id'
        );

        $profesional = $included->first(function ($item) use ($profesionalId) {
            return $item['type'] === 'Admin\\Personal'
                && $item['id'] == $profesionalId;
        });

        /* Especialidad */
        $especialidadId = data_get(
            $asignacion,
            'relationships.especialidad.data.id'
        );

        $especialidad = $included->first(function ($item) use ($especialidadId) {
            return $item['type'] === 'Admin\\Especialidad'
                && $item['id'] == $especialidadId;
        });

        $agenda['lugar_completo'] = $lugar;
        $agenda['profesional_completo'] = $profesional;
        $agenda['especialidad_completa'] = $especialidad;

        return $agenda;
    }
}
