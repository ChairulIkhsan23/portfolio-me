<?php

namespace App\Contracts\Repositories;

use Illuminate\Pagination\LengthAwarePaginator;

interface ExperienceRepositoryInterface
{
    public function getAll(array $filters = []): LengthAwarePaginator;
    public function getById(int $id): ?object;
}