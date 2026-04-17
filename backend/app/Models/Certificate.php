<?php

namespace App\Models;

use App\Enums\CertificateCategory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Certificate extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'issuer',
        'issuer_logo',
        'credential_id',
        'credential_url',
        'image',
        'issued_date',
        'expiry_date',
        'skills',
        'category',
        'is_featured',
        'sort_order'
    ];

    protected $casts = [
        'skills' => 'array',
        'issued_date' => 'date',
        'expiry_date' => 'date',
        'is_featured' => 'boolean',
        'category' => CertificateCategory::class
    ];

    // Accessor untuk format tanggal terbit
    public function getIssuedDateFormattedAttribute()
    {
        return $this->issued_date->format('M Y');
    }

    // Accessor untuk format tanggal kadaluarsa
    public function getExpiryDateFormattedAttribute()
    {
        return $this->expiry_date ? $this->expiry_date->format('M Y') : 'Lifetime';
    }

    // Cek apakah masih berlaku
    public function getIsValidAttribute()
    {
        if (!$this->expiry_date) return true;
        return $this->expiry_date->isFuture();
    }

    // Accessor untuk credential URL
    public function getCredentialUrlAttribute($value)
    {
        return $value ?: null;
    }

    // Scope untuk featured certificates
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    // Scope untuk filter by category
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    // Scope untuk valid certificates (belum expired)
    public function scopeValid($query)
    {
        return $query->where(function($q) {
            $q->whereNull('expiry_date')
            ->orWhere('expiry_date', '>', now());
        });
    }
}