<?php

namespace App\Repositories;

use App\Models\Certificate;
use App\Contracts\Repositories\CertificateRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class CertificateRepository implements CertificateRepositoryInterface
{
    public function getAll(array $filters = []): LengthAwarePaginator
    {
        return Certificate::query()
            ->select([
                'id',
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
            ])
            ->when($filters['category'] ?? null, function ($query, $category) {
                $query->where('category', $category);
            })
            ->orderByDesc('is_featured')
            ->orderByDesc('issued_date')
            ->orderBy('sort_order')
            ->paginate($filters['per_page'] ?? 10);
    }

    public function getById(int $id): ?Certificate
    {
        return Certificate::query()
            ->select([
                'id',
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
            ])
            ->find($id);
    }

    public function getFeatured(int $limit = 6): Collection
    {
        return Certificate::query()
            ->select([
                'id',
                'title',
                'issuer',
                'issuer_logo',
                'credential_id',
                'credential_url',
                'image',
                'issued_date',
                'category',
                'sort_order'
            ])
            ->where('is_featured', true)
            ->orderBy('sort_order')
            ->limit($limit)
            ->get();
    }

    public function getByCategory(string $category, int $limit = 10): Collection
    {
        return Certificate::query()
            ->select([
                'id',
                'title',
                'issuer',
                'issuer_logo',
                'credential_id',
                'credential_url',
                'image',
                'issued_date',
                'category',
                'sort_order'
            ])
            ->where('category', $category)
            ->orderByDesc('issued_date')
            ->limit($limit)
            ->get();
    }
}