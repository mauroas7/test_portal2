<?php

namespace Database\Factories;

use App\Models\Especialidad;
use Illuminate\Database\Eloquent\Factories\Factory;

class MedicoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nombre' => fake()->firstName(),
            'apellido' => fake()->lastName(),
            'matricula' => fake()->unique()->numerify('MP-#####'),
            // Si no le pasamos una especialidad al crearlo, agarra una al azar
            'especialidad_id' => Especialidad::inRandomOrder()->first()->id ?? Especialidad::factory(),
        ];
    }
}