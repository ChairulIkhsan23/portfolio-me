<?php

namespace App\Repositories;

use App\Models\Message;
use App\Contracts\Repositories\MessageRepositoryInterface;

class MessageRepository implements MessageRepositoryInterface
{
    public function getAll(array $filters = []): \Illuminate\Pagination\LengthAwarePaginator
    {
        $query = Message::select([
            'id', 'name', 'email', 'phone', 'subject',
            'message', 'is_read', 'read_at', 'ip_address', 'created_at'
        ])
        ->orderBy('is_read', 'asc')
        ->orderBy('created_at', 'desc');

        // Filter unread only
        if (!empty($filters['unread_only'])) {
            $query->where('is_read', false);
        }

        return $query->paginate($filters['per_page'] ?? 10);
    }

    public function getById(int $id): ?object
    {
        return Message::find($id);
    }

    public function store(array $data): object
    {
        return Message::create($data);
    }

    public function markAsRead(int $id): bool
    {
        $message = Message::find($id);
        if (!$message) {
            return false;
        }
        
        return $message->update([
            'is_read' => true,
            'read_at' => now(),
        ]);
    }

    public function destroy(int $id): bool
    {
        $message = Message::find($id);
        if (!$message) {
            return false;
        }
        
        return $message->delete();
    }
}