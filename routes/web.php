<?php

use App\Models\Especialidad;
use App\Models\Medico;
use App\Models\Turno;
use App\Http\Controllers\TurnoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 1. RUTA RAÍZ (Agregada para evitar el 404)
Route::get('/', function () {
    return redirect()->route('login');
});

// 2. RUTA DEL DASHBOARD (Actualizada con turnos reales)
Route::get('/dashboard', function () {
    
    // Traemos todas las especialidades y médicos
    $especialidades = Especialidad::all();
    $medicos = Medico::all()->map(function($medico) {
        $medico->turnos_disponibles = rand(0, 12); 
        return $medico;
    });

    // Traemos los turnos reales del usuario logueado
    $turnos = Turno::with(['especialidad', 'medico']) // Eager loading: Trae las relaciones juntas para más velocidad
        ->where('user_id', auth()->id()) // Filtramos solo los de este paciente
        ->orderBy('fecha_hora', 'asc')   // Los ordenamos cronológicamente
        ->get()
        ->map(function ($turno) {
            // Formateamos los datos exactamente como los espera tu Dashboard de React
            return [
                'id' => $turno->id,
                'fecha_hora' => $turno->fecha_hora,
                'estado' => $turno->estado,
                'especialidad' => $turno->especialidad->nombre ?? 'Sin especialidad',
                
                // Si eligió "Cualquier Profesional" el médico es null, lo manejamos elegante:
                'medico_nombre' => $turno->medico ? ($turno->medico->apellido . ', ' . $turno->medico->nombre) : 'Profesional a designar',
                
                'consultorio' => $turno->consultorio
            ];
        });

    return Inertia::render('Dashboard', [
        'especialidades_db' => $especialidades,
        'medicos_db' => $medicos,
        'turnos' => $turnos // <-- Ahora sí, le pasamos los datos reales a React
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// 3. RUTAS DE TURNOS
Route::post('/turnos', [TurnoController::class, 'store'])->middleware(['auth'])->name('turnos.store');

// 4. RUTAS DE AUTENTICACIÓN (Fundamental para el Login y Logout)
require __DIR__.'/auth.php';