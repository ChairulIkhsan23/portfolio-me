<?php

namespace Database\Seeders;

use App\Models\Experience;
use Illuminate\Database\Seeder;

class ExperienceSeeder extends Seeder
{
    public function run(): void
    {
        $experiences = [
            [
                'company' => 'PT Teknologi Inovasi',
                'position' => 'Senior Full Stack Developer',
                'location' => 'Jakarta, Indonesia',
                'company_logo' => '/images/companies/teknologi-inovasi.png',
                'description' => 'Mengembangkan dan memelihara aplikasi web perusahaan. Bertanggung jawab atas backend API dan frontend React.',
                'technologies' => json_encode(['Laravel', 'React', 'MySQL', 'Redis', 'Docker']),
                'achievements' => json_encode([
                    'Meningkatkan performa API sebesar 40%',
                    'Mengimplementasikan sistem caching Redis',
                    'Mentoring 3 junior developer'
                ]),
                'start_date' => '2023-01-01',
                'end_date' => null,
                'is_current' => true,
                'sort_order' => 1,
            ],
            [
                'company' => 'Startup Digital Kreatif',
                'position' => 'Full Stack Developer',
                'location' => 'Bandung, Indonesia',
                'company_logo' => '/images/companies/digital-kreatif.png',
                'description' => 'Membangun aplikasi web untuk klien startup. Fokus pada pengembangan fitur dan optimasi database.',
                'technologies' => json_encode(['Laravel', 'Vue.js', 'PostgreSQL', 'Tailwind CSS']),
                'achievements' => json_encode([
                    'Berhasil menyelesaikan 5+ project tepat waktu',
                    'Mengimplementasikan real-time notification'
                ]),
                'start_date' => '2021-06-01',
                'end_date' => '2022-12-31',
                'is_current' => false,
                'sort_order' => 2,
            ],
            [
                'company' => 'Freelance Web Developer',
                'position' => 'Freelance Developer',
                'location' => 'Remote',
                'company_logo' => null,
                'description' => 'Mengerjakan berbagai project web untuk klien dari berbagai industri.',
                'technologies' => json_encode(['PHP', 'WordPress', 'Laravel', 'Bootstrap', 'jQuery']),
                'achievements' => json_encode([
                    'Mengerjakan 15+ project untuk 10+ klien',
                    'Mempertahankan rating 5/5 di platform freelance'
                ]),
                'start_date' => '2019-01-01',
                'end_date' => '2021-05-31',
                'is_current' => false,
                'sort_order' => 3,
            ],
        ];

        foreach ($experiences as $experience) {
            Experience::updateOrCreate(
                ['company' => $experience['company'], 'position' => $experience['position']],
                $experience
            );
        }

        $this->command->info('Experience seeder completed: ' . count($experiences) . ' experiences');
    }
}