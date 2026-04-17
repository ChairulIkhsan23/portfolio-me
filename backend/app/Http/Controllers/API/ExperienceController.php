<?php

namespace App\Http\Controllers\API;

use App\Services\RedisCacheService;
use App\Http\Controllers\Controller;
use App\Repositories\ExperienceRepository;
use App\Http\Resources\ExperienceResource;

class ExperienceController extends Controller
{
    private RedisCacheService $cacheService;
    private ExperienceRepository $experienceRepository;

    public function __construct(
        RedisCacheService $cacheService,
        ExperienceRepository $experienceRepository
    ) {
        $this->cacheService = $cacheService;
        $this->experienceRepository = $experienceRepository;
    }

    public function index()
    {
        $perPage = request()->get('per_page', 10);
        $filters = ['per_page' => $perPage];

        return $this->cacheService
            ->tags(['experiences', 'list'])
            ->remember('experiences:list:' . md5(json_encode($filters)), function () use ($filters) {
                $experiences = $this->experienceRepository->getAll($filters);
                return ExperienceResource::collection($experiences);
            });
    }

    public function show($id)
    {
        return $this->cacheService
            ->tags(['experiences', 'detail'])
            ->remember('experiences:show:' . $id, function () use ($id) {
                $experience = $this->experienceRepository->getById($id);

                if (!$experience) {
                    return response()->json(['success' => false, 'message' => 'Experience not found'], 404);
                }

                return new ExperienceResource($experience);
            });
    }
}