<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Turno extends Model
{
    use HasFactory;

    protected $guarded = []; // Permite guardar datos masivamente

    // Relación: Un turno pertenece a un usuario (paciente)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}