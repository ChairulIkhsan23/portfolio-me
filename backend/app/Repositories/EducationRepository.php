<?php

namespace App\Repositories;

use App\Models\Education;
use App\Contracts\Repositories\EducationRepositoryInterface;

class EducationRepository implements EducationRepositoryInterface
{
    public function getAll(array $filters = []): \Illuminate\Pagination\LengthAwarePaginator
    {
        $query = Education::select([
            'id', 'institution', 'degree', 'field_of_study',
            'grade', 'logo', 'start_date', 'end_date',
            'is_current', 'description', 'sort_order'
        ])
        ->orderBy('is_current', 'desc')
        ->orderBy('start_date', 'desc')
        ->orderBy('sort_order');

        return $query->paginate($filters['per_page'] ?? 10);
    }

    public function getById(int $id): ?object
    {
        return Education::find($id);
    }
}