<?php

namespace App\Repositories;

use App\Models\Experience;
use App\Contracts\Repositories\ExperienceRepositoryInterface;

class ExperienceRepository implements ExperienceRepositoryInterface
{
    public function getAll(array $filters = []): \Illuminate\Pagination\LengthAwarePaginator
    {
        $query = Experience::select([
            'id', 'company', 'position', 'location', 'company_logo',
            'description', 'technologies', 'achievements',
            'start_date', 'end_date', 'is_current', 'sort_order'
        ])
        ->orderBy('is_current', 'desc')
        ->orderBy('start_date', 'desc')
        ->orderBy('sort_order');

        return $query->paginate($filters['per_page'] ?? 10);
    }

    public function getById(int $id): ?object
    {
        return Experience::find($id);
    }
}