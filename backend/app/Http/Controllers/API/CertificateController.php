<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Repositories\CertificateRepository;
use App\Http\Resources\CertificateResource;

class CertificateController extends Controller
{
    private CertificateRepository $certificateRepository;

    public function __construct(CertificateRepository $certificateRepository)
    {
        $this->certificateRepository = $certificateRepository;
    }

    public function index()
    {
        $perPage = request()->get('per_page', 10);
        $category = request()->get('category');

        $filters = [
            'per_page' => $perPage,
            'category' => $category
        ];

        $certificates = $this->certificateRepository->getAll($filters);

        return CertificateResource::collection($certificates);
    }

    public function show($id)
    {
        $certificate = $this->certificateRepository->getById($id);

        if (!$certificate) {
            return response()->json([
                'success' => false,
                'message' => 'Certificate not found'
            ], 404);
        }

        return new CertificateResource($certificate);
    }

    public function featured()
    {
        $limit = request()->get('limit', 6);

        $certificates = $this->certificateRepository->getFeatured($limit);

        return response()->json([
            'success' => true,
            'data' => $certificates
        ]);
    }

    public function byCategory($category)
    {
        $limit = request()->get('limit', 10);

        $certificates = $this->certificateRepository->getByCategory($category, $limit);

        return response()->json([
            'success' => true,
            'data' => $certificates
        ]);
    }
}