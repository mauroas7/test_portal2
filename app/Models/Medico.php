<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medico extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'apellido', 'matricula', 'especialidad_id'];

    public function especialidad()
    {
        return $this->belongsTo(Especialidad::class);
    }

    public function turnos()
    {
        return $this->hasMany(Turno::class);
    }
}