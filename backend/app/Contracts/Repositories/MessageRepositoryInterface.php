<?php

namespace App\Contracts\Repositories;

use App\Models\Message;
use Illuminate\Pagination\LengthAwarePaginator;

interface MessageRepositoryInterface
{
    public function getAll(array $filters = []): LengthAwarePaginator;

    public function getById(int $id): ?Message;

    public function store(array $data): Message;

    public function markAsRead(int $id): bool;

    public function destroy(int $id): bool;
}