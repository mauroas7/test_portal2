<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use App\Services\ProfesionalService;

class TurnoService
{
    public function getTurnoById($id)
    {
        $response = Http::withOptions([
            'verify' => false,
        ])->withBasicAuth(
            config('services.alephoo.user'),
            config('services.alephoo.password')
        )->get(
            config('services.alephoo.base_url')
                . "/admision/turnos/{$id}"
        );

        if ($response->failed()) {
            return null;
        }

        $data = $response->json();
        $turno = $data['data'];
        $included = collect($data['included']);

        /* EstadoTurno */
        $estadoTurnoId = data_get(
            $turno,
            'relationships.estadoTurno.data.id'
        );

        $estadoTurno = $included->first(function ($item) use ($estadoTurnoId) {
            return $item['type'] === 'Admision\\Estadoturno'
                && $item['id'] == $estadoTurnoId;
        });

        $turno['estado_completo'] = $estadoTurno;

        /* Agenda */
        $agendaId = data_get(
            $turno,
            'relationships.agenda.data.id'
        );

        $agenda = $included->first(function ($item) use ($agendaId) {
            return $item['type'] === 'Admision\\Agenda'
                && $item['id'] == $agendaId;
        });

        /* Profesional */
        $profesionalId = data_get(
            $agenda,
            'relationships.profesional.data.id'
        );

        $profesional = $included->first(function ($item) use ($profesionalId) {
            return $item['type'] === 'Admin\\Personal'
                && $item['id'] == $profesionalId;
        });

        $personaId = data_get(
            $profesional,
            'relationships.persona.data.id'
        );

        $persona = $included->first(function ($item) use ($personaId) {

            return $item['type'] === 'Admin\\Persona'
                && $item['id'] == $personaId;
        });

        $profesional['persona_completa'] = $persona;

        /* Especialidad */
        $especialidadId = data_get(
            $agenda,
            'relationships.especialidad.data.id'
        );

        $especialidad = $included->first(function ($item) use ($especialidadId) {
            return $item['type'] === 'Admin\\Especialidad'
                && $item['id'] == $especialidadId;
        });

        $turno['estado_turno'] = $estadoTurno;
        $turno['agenda_completa'] = $agenda;
        $turno['profesional_completo'] = $profesional;
        $turno['especialidad_completa'] = $especialidad;

        return $turno;
    }

    public function getTurnosByPersonaId(
        $personaId,
        $estado = null
    ) {
        $query = [
            'filter[persona]' => $personaId,
            'filter[fechaInicio]' => now()
                ->subYears(3)
                ->format('Y-m-d'),
        ];

        /* Filtro por estado */
        if ($estado) {
            $query['filter[estado]'] = $estado;
        }

        $response = Http::withOptions([
            'verify' => false,
        ])->withBasicAuth(
            config('services.alephoo.user'),
            config('services.alephoo.password')
        )->get(
            config('services.alephoo.base_url')
                . '/admision/turnos',
            $query
        );

        if ($response->failed()) {
            return [];
        }

        $data = $response->json();
        $turnos = $data['data'] ?? [];
        $included = collect($data['included'] ?? []);

        return collect($turnos)->map(function ($turno) use ($included) {

            /* Estado turno */
            $estadoId = data_get(
                $turno,
                'relationships.estadoTurno.data.id'
            );

            $estadoTurno = $included->first(function ($item) use ($estadoId) {
                return $item['type'] === 'Admision\\Estadoturno'
                    && $item['id'] == $estadoId;
            });

            /* Agenda */
            $agendaId = data_get(
                $turno,
                'relationships.agenda.data.id'
            );

            $agenda = $included->first(function ($item) use ($agendaId) {
                return $item['type'] === 'Admision\\Agenda'
                    && $item['id'] == $agendaId;
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

            /* Especialidad */
            $especialidadId = data_get(
                $asignacion,
                'relationships.especialidad.data.id'
            );

            $especialidad = $included->first(function ($item) use ($especialidadId) {
                return $item['type'] === 'Admin\\Especialidad'
                    && $item['id'] == $especialidadId;
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

            $personaId = data_get(
                $profesional,
                'relationships.persona.data.id'
            );

            $persona = $included->first(function ($item) use ($personaId) {

                return $item['type'] === 'Admin\\Persona'
                    && $item['id'] == $personaId;
            });

            $profesional['persona_completa'] = $persona;
            
            $turno['estado_completo'] = $estadoTurno;
            $turno['agenda_completa'] = $agenda;
            $turno['especialidad_completa'] = $especialidad;
            $turno['profesional_completo'] = $profesional;

            return $turno;
        });
    }
}
