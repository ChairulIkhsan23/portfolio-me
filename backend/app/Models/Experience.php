<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Experience extends Model
{
    use HasFactory;

    protected $fillable = [
        'company',
        'position',
        'location',
        'company_logo',
        'description',
        'technologies',
        'achievements',
        'start_date',
        'end_date',
        'is_current',
        'sort_order'
    ];

    protected $casts = [
        'technologies' => 'array',
        'achievements' => 'array',
        'start_date' => 'date',
        'end_date' => 'date',
        'is_current' => 'boolean'
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

    // Accessor untuk duration
    public function getDurationAttribute()
    {
        $start = $this->start_date;
        $end = $this->is_current ? now() : $this->end_date;
        
        if (!$end) return $start->format('M Y');
        
        $years = $end->diffInYears($start);
        $months = $end->diffInMonths($start) % 12;
        
        if ($years > 0 && $months > 0) {
            return "{$years} yr {$months} mos";
        } elseif ($years > 0) {
            return "{$years} yr";
        } else {
            return "{$months} mos";
        }
    }

    // Scope untuk current experience
    public function scopeCurrent($query)
    {
        return $query->where('is_current', true);
    }
}