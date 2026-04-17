<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExperienceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'company' => $this->company,
            'position' => $this->position,
            'location' => $this->location,
            'company_logo' => $this->company_logo,
            'description' => $this->description,
            'technologies' => is_string($this->technologies) ? json_decode($this->technologies, true) : $this->technologies,
            'achievements' => is_string($this->achievements) ? json_decode($this->achievements, true) : $this->achievements,
            'start_date' => $this->start_date?->format('Y-m-d'),
            'start_year' => $this->start_date?->format('Y'),
            'end_date' => $this->end_date?->format('Y-m-d'),
            'end_year' => $this->end_date?->format('Y'),
            'is_current' => $this->is_current,
            'sort_order' => $this->sort_order,
            'duration' => $this->start_date?->format('M Y') . ' - ' . ($this->is_current ? 'Present' : ($this->end_date?->format('M Y') ?? 'Present')),
            'duration_years' => $this->start_date?->diffInYears($this->is_current ? now() : ($this->end_date ?? now())) . ' yrs',
        ];
    }
}