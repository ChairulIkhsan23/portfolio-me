<?php

namespace App\Contracts\Repositories;

use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\Certificate;

interface CertificateRepositoryInterface
{
    public function getAll(array $filters = []): LengthAwarePaginator;

    public function getById(int $id): ?Certificate;

    public function getFeatured(int $limit = 6);

    public function getByCategory(string $category, int $limit = 10);
}