<?php

use App\Models\Especialidad;
use App\Models\Medico;
use App\Models\Turno;
use App\Http\Controllers\TurnoController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 1. RUTA RAÍZ
Route::get('/', function () {
    return redirect()->route('login');
});

// 2. RUTA DEL DASHBOARD
Route::get('/dashboard', function () {

    // $especialidades = Especialidad::all();
    // $medicos = Medico::all()->map(function ($medico) {
    //     $medico->turnos_disponibles = rand(0, 12);
    //     return $medico;
    // });

    // $turnos = Turno::with(['especialidad', 'medico'])
    //     ->where('user_id', auth()->id())                // Se podría reemplazar por --> Auth::id() + use Illuminate\Support\Facades\Auth;
    //     ->orderBy('fecha_hora', 'asc')
    //     ->get()
    //     ->map(function ($turno) {
    //         return [
    //             'id' => $turno->id,
    //             'fecha_hora' => $turno->fecha_hora,
    //             'estado' => $turno->estado,
    //             'especialidad' => $turno->especialidad->nombre ?? 'Sin especialidad',
    //             'medico_nombre' => $turno->medico ? ($turno->medico->apellido . ', ' . $turno->medico->nombre) : 'Profesional a designar',
    //             'consultorio' => $turno->consultorio
    //         ];
    //     });

    return Inertia::render(
        'Dashboard'
        //  [
        //     'especialidades_db' => $especialidades,
        //     'medicos_db' => $medicos,
        //     'turnos' => $turnos 
        // ]
    );
})->middleware(['auth', 'verified'])->name('dashboard');

// 3. RUTAS DE PERFIL
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// 4. RUTAS DE TURNOS
Route::post('/turnos', [TurnoController::class, 'store'])->middleware(['auth'])->name('turnos.store');
Route::delete('/turnos/{id}', [TurnoController::class, 'destroy'])->middleware(['auth'])->name('turnos.destroy');

// 5. RUTAS DE AUTENTICACIÓN
require __DIR__ . '/auth.php';
