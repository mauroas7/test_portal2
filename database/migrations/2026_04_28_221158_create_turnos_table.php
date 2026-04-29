<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('turnos', function (Blueprint $table) {
            $table->id();
            // Vinculamos el turno con el usuario (paciente)
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('medico_nombre');
            $table->string('especialidad');
            $table->dateTime('fecha_hora');
            $table->string('consultorio');
            $table->string('estado')->default('pendiente');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('turnos');
    }
};