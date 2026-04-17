<?php

namespace App\Contracts\Services;

interface CacheServiceInterface
{
    public function remember(string $key, callable $callback, ?int $ttl = null): mixed;
    public function forget(string $key): void;
    public function tags(array $tags): self;
    public function flush(): void;
}