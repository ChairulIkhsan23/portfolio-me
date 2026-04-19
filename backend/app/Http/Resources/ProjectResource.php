<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'image' => $this->image && str_starts_with($this->image, 'http')
                ? $this->image
                : asset('storage/' . $this->image),
            'category' => $this->category,
            'technologies' => is_string($this->technologies) ? json_decode($this->technologies, true) : $this->technologies,
            'technologies_label' => $this->technologies_label,
            'completion_date' => $this->completion_date?->format('Y-m-d'),
            'completion_date_formatted' => $this->completion_date?->format('M Y'),
            'github_url' => $this->github_url,
            'project_url' => $this->project_url,
            'is_featured' => $this->is_featured,
        ];
    }
}
