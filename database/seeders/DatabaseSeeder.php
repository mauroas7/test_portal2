<?php

namespace Database\Seeders;

use App\Models\Especialidad;
use App\Models\Medico;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Crear un usuario de prueba (Paciente) para vos
        User::factory()->create([
            'name' => 'Juan',
            'last_name' => 'Perez',
            'email' => 'juanp@gmail.com',
            'password' => Hash::make('123123123'),
            'dni' => '38444555',
            'phone' => '2611234567',
            'obra_social' => 'OSDE',
            'plan' => '210',
        ]);

        // 2. Especialidades Reales
        $especialidadesNombres = [
            'Cardiología', 'Clínica Médica', 'Dermatología', 'Endocrinología', 
            'Gastroenterología', 'Ginecología', 'Neurología', 'Nutrición',
            'Odontología', 'Oftalmología', 'Pediatría', 'Psiquiatría', 
            'Traumatología', 'Urología'
        ];

        foreach ($especialidadesNombres as $nombre) {
            $especialidad = Especialidad::create([
                'nombre' => $nombre,
                'descripcion' => "Atención integral en $nombre.",
            ]);

            // 3. Crear exactamente 2 médicos aleatorios por especialidad
            Medico::factory(2)->create([
                'especialidad_id' => $especialidad->id,
            ]);
        }
    }
}