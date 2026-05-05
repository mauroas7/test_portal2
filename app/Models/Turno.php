<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Turno extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'especialidad_id', 
        'medico_id', 
        'fecha_hora', 
        'consultorio', 
        'estado'
    ];

    protected $casts = [
        'fecha_hora' => 'datetime',
    ];

    public function paciente()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function especialidad()
    {
        return $this->belongsTo(Especialidad::class);
    }

    public function medico()
    {
        return $this->belongsTo(Medico::class);
    }
}