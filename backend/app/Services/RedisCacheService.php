<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use App\Contracts\Services\CacheServiceInterface;

class RedisCacheService implements CacheServiceInterface
{
    private int $defaultTtl;
    private array $currentTags = [];

    public function __construct(int $defaultTtl = 3600)
    {
        $this->defaultTtl = $defaultTtl;
    }

    public function remember(string $key, callable $callback, ?int $ttl = null): mixed
    {
        $cacheKey = 'api:' . $key;
        $ttl = $ttl ?? $this->defaultTtl;

        // SEMENTARA: Skip tagging, langsung cache biasa
        return Cache::remember($cacheKey, $ttl, $callback);
    }

    public function forget(string $key): void
    {
        $cacheKey = 'api:' . $key;
        Cache::forget($cacheKey);
    }

    public function tags(array $tags): self
    {
        $this->currentTags = $tags;
        return $this;
    }

    public function flush(): void
    {
        Cache::flush();
        $this->currentTags = [];
    }
}