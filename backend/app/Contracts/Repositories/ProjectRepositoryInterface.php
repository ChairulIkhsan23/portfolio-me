<?php

namespace App\Contracts\Repositories;

use Illuminate\Pagination\LengthAwarePaginator;

interface ProjectRepositoryInterface
{
    public function getPublishedProjects(int $perPage = 10, array $filters = []): LengthAwarePaginator;
    public function getProjectBySlug(string $slug): ?object;
    public function getFeaturedProjects(int $limit = 6): array;
    public function getRecentProjects(int $limit = 6): array;
}