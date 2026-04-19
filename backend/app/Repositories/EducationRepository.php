<?php

namespace App\Repositories;

use App\Models\Education;
use App\Contracts\Repositories\EducationRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class EducationRepository implements EducationRepositoryInterface
{
    public function getAll(array $filters = []): LengthAwarePaginator
    {
        return Education::query()
            ->select([
                'id',
                'institution',
                'degree',
                'field_of_study',
                'grade',
                'logo',
                'start_date',
                'end_date',
                'is_current',
                'description',
                'sort_order'
            ])
            ->orderByDesc('is_current')
            ->orderByDesc('start_date')
            ->orderBy('sort_order')
            ->paginate($filters['per_page'] ?? 10);
    }

    public function getById(int $id): ?Education
    {
        return Education::query()
            ->select([
                'id',
                'institution',
                'degree',
                'field_of_study',
                'grade',
                'logo',
                'start_date',
                'end_date',
                'is_current',
                'description',
                'sort_order'
            ])
            ->find($id);
    }
}