<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Turno;
use App\Models\User;

class TurnoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Creamos un usuario de prueba para poder iniciar sesión
        $user = User::factory()->create([
            'name' => 'Juan',
            'last_name' => 'Perez',
            'dni' => '12345678',
            'phone' => '2615555555',
            'genero' => 'Masculino',
            'obra_social' => 'OSEP',
            'plan' => 'Básico',
            'email' => 'juanp@gmail.com',
            'password' => bcrypt('123123123'),
        ]);

        // 2. Le asignamos un par de turnos a ese usuario
        Turno::create([
            'user_id' => $user->id, 
            'medico_nombre' => 'Dra. Elena Rossi',
            'especialidad' => 'Gastroenterología',
            'fecha_hora' => now()->addDays(3),
            'consultorio' => 'Consultorio 202',
            'estado' => 'confirmado'
        ]);

        Turno::create([
            'user_id' => $user->id, 
            'medico_nombre' => 'Dr. Fernando López',
            'especialidad' => 'Cardiología',
            'fecha_hora' => now()->addDays(10),
            'consultorio' => 'Consultorio 14',
            'estado' => 'pendiente'
        ]);
    }
}