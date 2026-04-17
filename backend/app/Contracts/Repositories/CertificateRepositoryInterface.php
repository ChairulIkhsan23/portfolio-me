<?php

namespace App\Contracts\Repositories;

use Illuminate\Pagination\LengthAwarePaginator;

interface CertificateRepositoryInterface
{
    public function getAll(array $filters = []): LengthAwarePaginator;
    public function getById(int $id): ?object;
    public function getFeatured(int $limit = 6): array;
    public function getByCategory(string $category, int $limit = 10): array;
}