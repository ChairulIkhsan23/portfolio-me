<?php

namespace App\Http\Controllers\API;

use App\Services\RedisCacheService;
use App\Http\Controllers\Controller;
use App\Repositories\CertificateRepository;
use App\Http\Resources\CertificateResource;

class CertificateController extends Controller
{
    private RedisCacheService $cacheService;
    private CertificateRepository $certificateRepository;

    public function __construct(
        RedisCacheService $cacheService,
        CertificateRepository $certificateRepository
    ) {
        $this->cacheService = $cacheService;
        $this->certificateRepository = $certificateRepository;
    }

    public function index()
    {
        $perPage = request()->get('per_page', 10);
        $category = request()->get('category');
        $filters = ['per_page' => $perPage, 'category' => $category];

        return $this->cacheService
            ->tags(['certificates', 'list'])
            ->remember('certificates:list:' . md5(json_encode($filters)), function () use ($filters) {
                $certificates = $this->certificateRepository->getAll($filters);
                return CertificateResource::collection($certificates);
            });
    }

    public function show($id)
    {
        return $this->cacheService
            ->tags(['certificates', 'detail'])
            ->remember('certificates:show:' . $id, function () use ($id) {
                $certificate = $this->certificateRepository->getById($id);

                if (!$certificate) {
                    return response()->json(['success' => false, 'message' => 'Certificate not found'], 404);
                }

                return new CertificateResource($certificate);
            });
    }

    public function featured()
    {
        $limit = request()->get('limit', 6);

        return $this->cacheService
            ->tags(['certificates', 'featured'])
            ->remember('certificates:featured:' . $limit, function () use ($limit) {
                $certificates = $this->certificateRepository->getFeatured($limit);
                return response()->json([
                    'success' => true,
                    'data' => $certificates
                ]);
            });
    }

    public function byCategory($category)
    {
        $limit = request()->get('limit', 10);

        return $this->cacheService
            ->tags(['certificates', 'category'])
            ->remember('certificates:category:' . $category . ':' . $limit, function () use ($category, $limit) {
                $certificates = $this->certificateRepository->getByCategory($category, $limit);
                return response()->json([
                    'success' => true,
                    'data' => $certificates
                ]);
            });
    }
}