<?php

namespace App\Http\Controllers\Paciente;

use App\Http\Controllers\Controller;
use App\Contracts\TurnoRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected $turnos;

    // Inyectamos la interfaz (El Contrato)
    public function __construct(TurnoRepositoryInterface $turnos)
    {
        $this->turnos = $turnos;
    }

    public function index(Request $request)
    {
        // Inertia envía los datos directamente a la vista de React
        return Inertia::render('Dashboard', [
            'turnos' => $this->turnos->getProximosTurnos($request->user()->id)
        ]);
    }
}