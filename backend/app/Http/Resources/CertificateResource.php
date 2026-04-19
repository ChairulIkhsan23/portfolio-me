<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CertificateResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'issuer' => $this->issuer,
            'issuer_logo' => $this->issuer_logo,
            'credential_id' => $this->credential_id,
            'credential_url' => $this->credential_url,
            'image' => $this->image && str_starts_with($this->image, 'http')
                ? $this->image
                : asset('storage/' . $this->image),
            'issued_date' => $this->issued_date?->format('Y-m-d'),
            'issued_year' => $this->issued_date?->format('Y'),
            'issued_formatted' => $this->issued_date?->format('M Y'),
            'expiry_date' => $this->expiry_date?->format('Y-m-d'),
            'expiry_formatted' => $this->expiry_date?->format('M Y'),
            'is_valid' => !$this->expiry_date || $this->expiry_date->isFuture(),
            'skills' => is_string($this->skills) ? json_decode($this->skills, true) : $this->skills,
            'category' => $this->category,
            'category_label' => $this->category_label,
            'category_name' => $this->category_name,
            'is_featured' => $this->is_featured,
            'sort_order' => $this->sort_order,
        ];
    }
}