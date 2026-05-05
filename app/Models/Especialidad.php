<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Especialidad extends Model
{
    use HasFactory;

    protected $table = 'especialidades';
    protected $fillable = ['nombre', 'descripcion'];

    public function medicos()
    {
        return $this->hasMany(Medico::class);
    }

    public function turnos()
    {
        return $this->hasMany(Turno::class);
    }
}