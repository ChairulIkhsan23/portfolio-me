<?php

namespace App\Repositories;

use App\Models\Message;
use App\Contracts\Repositories\MessageRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class MessageRepository implements MessageRepositoryInterface
{
    private function baseQuery()
    {
        return Message::query()->select([
            'id',
            'name',
            'email',
            'phone',
            'subject',
            'message',
            'is_read',
            'read_at',
            'ip_address',
            'created_at'
        ]);
    }

    public function getAll(array $filters = []): LengthAwarePaginator
    {
        return $this->baseQuery()
            ->when($filters['unread_only'] ?? false, function ($query) {
                $query->where('is_read', false);
            })
            ->orderBy('is_read', 'asc')
            ->orderByDesc('created_at')
            ->paginate($filters['per_page'] ?? 10);
    }

    public function getById(int $id): ?Message
    {
        return $this->baseQuery()
            ->where('id', $id)
            ->first();
    }

    public function store(array $data): Message
    {
        return Message::create($data);
    }

    public function markAsRead(int $id): bool
    {
        return Message::where('id', $id)->update([
            'is_read' => true,
            'read_at' => now(),
        ]) > 0;
    }

    public function destroy(int $id): bool
    {
        return Message::where('id', $id)->delete() > 0;
    }
}