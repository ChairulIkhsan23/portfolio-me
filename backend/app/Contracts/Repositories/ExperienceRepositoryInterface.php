<?php

namespace App\Contracts\Repositories;

use App\Models\Experience;
use Illuminate\Pagination\LengthAwarePaginator;

interface ExperienceRepositoryInterface
{
    public function getAll(array $filters = []): LengthAwarePaginator;

    public function getById(int $id): ?Experience;
}