<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Http\Controllers\TestApiController;
use App\Http\Controllers\Api\PersonaApiController;
use App\Http\Controllers\Api\ProfesionalApiController;
use App\Http\Controllers\Api\TurnoApiController;
use App\Http\Controllers\Api\AgendaApiController;
use App\Http\Controllers\Api\PersonaTurnosApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/users', function () {
    return User::all();
});

// Route::get('/test-basic-auth', [TestApiController::class, 'test']);

Route::get('/personas', [PersonaApiController::class, 'index']);

Route::get('/personas/{id}', [PersonaApiController::class, 'show']);

Route::get(
    '/profesionales/{id}',
    [ProfesionalApiController::class, 'show']
);

Route::get(
    '/profesionales/{id}/detalle',
    [ProfesionalApiController::class, 'detail']
);

Route::get(
    '/turnos/{id}',
    [TurnoApiController::class, 'show']
);

Route::get(
    '/agendas/{id}',
    [AgendaApiController::class, 'show']
);

Route::get(
    '/personas/{id}/turnos',
    [PersonaTurnosApiController::class, 'index']
);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
