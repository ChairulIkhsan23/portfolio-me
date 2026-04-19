<?php

namespace App\Repositories;

use App\Models\Experience;
use App\Contracts\Repositories\ExperienceRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class ExperienceRepository implements ExperienceRepositoryInterface
{
    public function getAll(array $filters = []): LengthAwarePaginator
    {
        return Experience::query()
            ->select([
                'id',
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
            ])
            ->orderByDesc('is_current')
            ->orderByDesc('start_date')
            ->orderBy('sort_order')
            ->paginate($filters['per_page'] ?? 10);
    }

    public function getById(int $id): ?Experience
    {
        return Experience::query()
            ->select([
                'id',
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
            ])
            ->find($id);
    }
}