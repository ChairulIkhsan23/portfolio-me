<?php

namespace Database\Seeders;

use App\Models\Education;
use Illuminate\Database\Seeder;

class EducationSeeder extends Seeder
{
    public function run(): void
    {
        $educations = [
            [
                'institution' => 'Universitas Gadjah Mada',
                'degree' => 'Sarjana Komputer',
                'field_of_study' => 'Ilmu Komputer',
                'grade' => '3.85 GPA',
                'logo' => '/images/education/ugm.png',
                'start_date' => '2018-08-01',
                'end_date' => '2022-06-30',
                'is_current' => false,
                'description' => json_encode([
                    'Fokus pada pengembangan web dan mobile',
                    'Aktif di organisasi Himpunan Mahasiswa Informatika',
                    'Juara 2 Lomba Coding Nasional 2021'
                ]),
                'sort_order' => 1,
            ],
            [
                'institution' => 'SMAN 1 Jakarta',
                'degree' => 'IPA',
                'field_of_study' => 'Matematika dan Ilmu Alam',
                'grade' => '90.5',
                'logo' => null,
                'start_date' => '2016-07-01',
                'end_date' => '2019-05-31',
                'is_current' => false,
                'description' => json_encode([
                    'Aktif di ekstrakurikuler robotika',
                    'Mengikuti klub programming dan workshop IT'
                ]),
                'sort_order' => 2,
            ],
            [
                'institution' => 'Dicoding Indonesia',
                'degree' => 'Bootcamp',
                'field_of_study' => 'Full Stack Web Developer',
                'grade' => 'Excellent',
                'logo' => '/images/education/dicoding.png',
                'start_date' => '2022-07-01',
                'end_date' => '2022-12-31',
                'is_current' => false,
                'description' => json_encode([
                    'Program intensif full stack web developer dengan 500+ jam pembelajaran',
                    'Menyelesaikan 3 project akhir dengan nilai A',
                    'Mendapatkan sertifikasi dengan predikat Excellent'
                ]),
                'sort_order' => 3,
            ],
        ];

        foreach ($educations as $education) {
            Education::updateOrCreate(
                ['institution' => $education['institution'], 'degree' => $education['degree']],
                $education
            );
        }

        $this->command->info('Education seeder completed: ' . count($educations) . ' educations');
    }
}