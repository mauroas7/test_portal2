<?php

namespace App\Http\Controllers;

use App\Models\Turno;
use Illuminate\Http\Request;

class TurnoController extends Controller
{
    public function store(Request $request)
    {
        // 1. Validamos que los datos que llegan desde React sean correctos
        $request->validate([
            'especialidad_id' => 'required|exists:especialidades,id',
            'medico_id'       => 'nullable|exists:medicos,id', // Puede ser null si eligió "Cualquier Profesional"
            'fecha'           => 'required|string',
            'hora'            => 'required|string',
        ]);

        // 2. Parseo de Fecha: Convertimos "14 de Mayo" a "2026-05-14"
        $meses = [
            'Enero' => '01', 'Febrero' => '02', 'Marzo' => '03', 'Abril' => '04', 
            'Mayo' => '05', 'Junio' => '06', 'Julio' => '07', 'Agosto' => '08', 
            'Septiembre' => '09', 'Octubre' => '10', 'Noviembre' => '11', 'Diciembre' => '12'
        ];
        
        $partesFecha = explode(' de ', $request->fecha); // Divide "14" y "Mayo"
        $dia = str_pad($partesFecha[0], 2, '0', STR_PAD_LEFT);
        $mes = $meses[$partesFecha[1]] ?? '01';
        $anio = date('Y'); // Toma el año actual (o podés forzar '2026')

        // Formato final: "2026-05-14 09:30:00"
        $fecha_hora = "{$anio}-{$mes}-{$dia} {$request->hora}:00";

        // 3. Guardamos el Turno en la Base de Datos
        Turno::create([
            'user_id'         => auth()->id(), // El ID del paciente logueado
            'especialidad_id' => $request->especialidad_id,
            'medico_id'       => $request->medico_id,
            'fecha_hora'      => $fecha_hora,
            'estado'          => 'confirmado', // Lo damos de alta como confirmado
        ]);

        // 4. Redireccionamos de vuelta al Dashboard (Inertia recargará los datos automáticamente)
        return redirect()->route('dashboard')->with('success', '¡Tu turno fue confirmado con éxito!');
    }

    /**
     * Eliminar (cancelar) un turno específico.
     */
    public function destroy($id)
    {
        // 1. Buscamos el turno en la base de datos
        $turno = \App\Models\Turno::findOrFail($id);

        // 2. SEGURIDAD: Verificamos que el turno pertenezca al usuario logueado
        // (Asumiendo que tu tabla de turnos tiene un campo 'user_id' o 'paciente_id')
        if ($turno->user_id !== auth()->id()) {
            abort(403, 'No tienes permiso para cancelar este turno.');
        }

        // 3. Eliminamos el turno
        $turno->delete();

        // 4. Retornamos a la misma página. 
        // Inertia recargará los datos de React automáticamente (sin recargar el navegador).
        return back()->with('success', 'Turno cancelado correctamente.');
    }
}