<?php

namespace App\Repositories;

use App\Models\Certificate;
use App\Contracts\Repositories\CertificateRepositoryInterface;

class CertificateRepository implements CertificateRepositoryInterface
{
    public function getAll(array $filters = []): \Illuminate\Pagination\LengthAwarePaginator
    {
        $query = Certificate::select([
            'id', 'title', 'issuer', 'issuer_logo', 'credential_id',
            'credential_url', 'image', 'issued_date', 'expiry_date',
            'skills', 'category', 'is_featured', 'sort_order'
        ])
        ->orderBy('is_featured', 'desc')
        ->orderBy('issued_date', 'desc')
        ->orderBy('sort_order');

        // Filter by category
        if (!empty($filters['category'])) {
            $query->where('category', $filters['category']);
        }

        return $query->paginate($filters['per_page'] ?? 10);
    }

    public function getById(int $id): ?object
    {
        return Certificate::find($id);
    }

    public function getFeatured(int $limit = 6): array
    {
        return Certificate::where('is_featured', true)
            ->orderBy('sort_order')
            ->limit($limit)
            ->get()
            ->toArray();
    }

    public function getByCategory(string $category, int $limit = 10): array
    {
        return Certificate::where('category', $category)
            ->orderBy('issued_date', 'desc')
            ->limit($limit)
            ->get()
            ->toArray();
    }
}