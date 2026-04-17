<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EducationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'institution' => $this->institution,
            'degree' => $this->degree,
            'field_of_study' => $this->field_of_study,
            'grade' => $this->grade,
            'logo' => $this->logo,
            'start_date' => $this->start_date?->format('Y-m-d'),
            'end_date' => $this->end_date?->format('Y-m-d'),
            'is_current' => $this->is_current,
            'description' => $this->description,
            'sort_order' => $this->sort_order,
            'duration' => $this->start_date?->format('Y') . ' - ' . ($this->is_current ? 'Present' : ($this->end_date?->format('Y') ?? 'Present')),
        ];
    }
}