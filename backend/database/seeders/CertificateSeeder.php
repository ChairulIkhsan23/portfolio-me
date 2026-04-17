<?php

namespace Database\Seeders;

use App\Models\Certificate;
use Illuminate\Database\Seeder;

class CertificateSeeder extends Seeder
{
    public function run(): void
    {
        $certificates = [
            [
                'title' => 'Laravel Certification',
                'issuer' => 'Laravel Academy',
                'issuer_logo' => '/images/certificates/issuers/laravel.png',
                'credential_id' => 'LAR-2024-001',
                'credential_url' => 'https://verify.laravel.com/12345',
                'image' => '/images/certificates/laravel-cert.jpg',
                'issued_date' => '2024-02-15',
                'expiry_date' => null,
                'skills' => json_encode(['Laravel', 'PHP', 'REST API', 'Eloquent ORM']),
                'category' => 'professional',
                'is_featured' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'React Developer',
                'issuer' => 'Meta',
                'issuer_logo' => '/images/certificates/issuers/meta.png',
                'credential_id' => 'META-REACT-2023',
                'credential_url' => 'https://coursera.org/verify/react',
                'image' => '/images/certificates/react-cert.jpg',
                'issued_date' => '2023-08-10',
                'expiry_date' => '2026-08-10',
                'skills' => json_encode(['React', 'JavaScript', 'Redux', 'Hooks', 'Next.js']),
                'category' => 'course',
                'is_featured' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'AWS Cloud Practitioner',
                'issuer' => 'Amazon Web Services',
                'issuer_logo' => '/images/certificates/issuers/aws.png',
                'credential_id' => 'AWS-CP-2024-001',
                'credential_url' => 'https://aws.amazon.com/verification',
                'image' => '/images/certificates/aws-cert.jpg',
                'issued_date' => '2024-01-20',
                'expiry_date' => '2027-01-20',
                'skills' => json_encode(['AWS', 'Cloud Computing', 'EC2', 'S3', 'Lambda']),
                'category' => 'professional',
                'is_featured' => false,
                'sort_order' => 3,
            ],
        ];

        foreach ($certificates as $certificate) {
            Certificate::updateOrCreate(
                ['title' => $certificate['title'], 'issuer' => $certificate['issuer']],
                $certificate
            );
        }

        $this->command->info('Certificate seeder completed: ' . count($certificates) . ' certificates');
    }
}