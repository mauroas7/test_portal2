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
            
            // 1. EL PACIENTE: Quién pide el turno
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // 2. LA ESPECIALIDAD: Qué busca el paciente (Obligatorio)
            $table->foreignId('especialidad_id')->constrained('especialidades')->onDelete('cascade');
            
            // 3. EL MÉDICO: Con quién se atiende 
            // ¡Es 'nullable' gracias a nuestro botón de "Cualquier Profesional"!
            $table->foreignId('medico_id')->nullable()->constrained('medicos')->onDelete('set null');
            
            // 4. DATOS DEL TURNO
            $table->dateTime('fecha_hora');
            $table->string('consultorio')->nullable(); // Suele asignarse el mismo día al llegar a la sede
            
            // Estados posibles: 'pendiente', 'confirmado', 'cancelado_paciente', 'cancelado_medico', 'asistio'
            $table->string('estado')->default('pendiente'); 
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('turnos');
    }
};