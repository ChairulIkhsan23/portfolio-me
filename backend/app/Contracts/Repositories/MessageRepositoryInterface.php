<?php

namespace App\Contracts\Repositories;

use Illuminate\Pagination\LengthAwarePaginator;

interface MessageRepositoryInterface
{
    public function getAll(array $filters = []): LengthAwarePaginator;
    public function getById(int $id): ?object;
    public function store(array $data): object;
    public function markAsRead(int $id): bool;
    public function destroy(int $id): bool;
}