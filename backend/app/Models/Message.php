<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'subject',
        'message',
        'is_read',
        'read_at',
        'ip_address'
    ];

    protected $casts = [
        'is_read' => 'boolean',
        'read_at' => 'datetime'
    ];

    // Mark as read
    public function markAsRead()
    {
        $this->update([
            'is_read' => true,
            'read_at' => now()
        ]);
    }

    // Mark as unread
    public function markAsUnread()
    {
        $this->update([
            'is_read' => false,
            'read_at' => null
        ]);
    }

    // Scope untuk unread messages
    public function scopeUnread($query)
    {
        return $query->where('is_read', false);
    }

    // Scope untuk read messages
    public function scopeRead($query)
    {
        return $query->where('is_read', true);
    }
}