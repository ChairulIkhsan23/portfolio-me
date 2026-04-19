<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use App\Contracts\Services\CacheServiceInterface;

class CacheService implements CacheServiceInterface
{
    private int $defaultTtl;

    public function __construct(int $defaultTtl = 3600)
    {
        $this->defaultTtl = $defaultTtl;
    }

    public function remember(string $key, callable $callback, ?int $ttl = null): mixed
    {
        return Cache::remember(
            'api:' . $key,
            $ttl ?? $this->defaultTtl,
            $callback
        );
    }

    public function forget(string $key): void
    {
        Cache::forget('api:' . $key);
    }

    public function tags(array $tags): self
    {
        return $this;
    }

    public function flush(): void
    {
        Cache::flush();
    }
}