<?php

namespace App\Contracts\Repositories;

use App\Models\Education;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface EducationRepositoryInterface
{
    public function getAll(array $filters = []): LengthAwarePaginator;

    public function getById(int $id): ?Education;
}