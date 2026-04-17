<?php

namespace App\Contracts\Repositories;

use Illuminate\Pagination\LengthAwarePaginator;

interface EducationRepositoryInterface
{
    public function getAll(array $filters = []): LengthAwarePaginator;
    public function getById(int $id): ?object;
}