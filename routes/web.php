<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Paciente\DashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Tu nueva ruta conectada al controlador
Route::get('/dashboard', function () {
    // 1. Buscamos los turnos del paciente logueado usando el Modelo
    $turnos = \App\Models\Turno::where('user_id', auth()->id())->get();

    // 2. Se los pasamos a la vista de React
    return Inertia::render('Dashboard', [
        'turnos' => $turnos
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
