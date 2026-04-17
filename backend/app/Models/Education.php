<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Education extends Model
{
    use HasFactory;

    protected $fillable = [
        'institution',
        'degree',
        'field_of_study',
        'grade',
        'logo',
        'start_date',
        'end_date',
        'is_current',
        'description',
        'achievements',
        'sort_order'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_current' => 'boolean',
        'achievements' => 'array'
    ];

    // Accessor untuk format tanggal mulai
    public function getStartDateFormattedAttribute()
    {
        return $this->start_date->format('M Y');
    }

    // Accessor untuk format tanggal selesai
    public function getEndDateFormattedAttribute()
    {
        if ($this->is_current) {
            return 'Present';
        }
        return $this->end_date ? $this->end_date->format('M Y') : null;
    }

    // Accessor untuk full title (degree + field)
    public function getFullTitleAttribute()
    {
        return "{$this->degree} in {$this->field_of_study}";
    }

    // Scope untuk current education
    public function scopeCurrent($query)
    {
        return $query->where('is_current', true);
    }
}