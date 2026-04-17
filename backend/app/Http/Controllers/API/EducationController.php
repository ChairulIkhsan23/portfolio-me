<?php

namespace App\Http\Controllers\API;

use App\Services\RedisCacheService;
use App\Http\Controllers\Controller;
use App\Repositories\EducationRepository;
use App\Http\Resources\EducationResource;

class EducationController extends Controller
{
    private RedisCacheService $cacheService;
    private EducationRepository $educationRepository;

    public function __construct(
        RedisCacheService $cacheService,
        EducationRepository $educationRepository
    ) {
        $this->cacheService = $cacheService;
        $this->educationRepository = $educationRepository;
    }

    public function index()
    {
        $perPage = request()->get('per_page', 10);
        $filters = ['per_page' => $perPage];

        return $this->cacheService
            ->tags(['educations', 'list'])
            ->remember('educations:list:' . md5(json_encode($filters)), function () use ($filters) {
                $educations = $this->educationRepository->getAll($filters);
                return EducationResource::collection($educations);
            });
    }

    public function show($id)
    {
        return $this->cacheService
            ->tags(['educations', 'detail'])
            ->remember('educations:show:' . $id, function () use ($id) {
                $education = $this->educationRepository->getById($id);

                if (!$education) {
                    return response()->json(['success' => false, 'message' => 'Education not found'], 404);
                }

                return new EducationResource($education);
            });
    }
}