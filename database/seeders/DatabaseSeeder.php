<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Llamamos a nuestro Seeder de Turnos
        $this->call([
            TurnoSeeder::class,
        ]);
    }
}
