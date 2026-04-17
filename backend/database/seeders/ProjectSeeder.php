<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'title' => 'Portfolio Website',
                'slug' => 'portfolio-website',
                'description' => 'Website portfolio pribadi menggunakan Laravel 12 dan Next.js dengan fitur admin panel Filament.',
                'content' => 'Website ini dibuat untuk menampilkan portofolio project, pengalaman kerja, dan sertifikat. Menggunakan Laravel 12 sebagai backend API, Next.js sebagai frontend, dan Filament sebagai admin panel.',
                'image' => '/images/projects/portfolio.jpg',
                'images' => json_encode(['/images/projects/portfolio-1.jpg', '/images/projects/portfolio-2.jpg']),
                'category' => 'fullstack',
                'technologies' => json_encode(['Laravel', 'Next.js', 'Tailwind CSS', 'MySQL', 'Docker', 'Redis']),
                'project_url' => 'https://portfolio.example.com',
                'github_url' => 'https://github.com/username/portfolio',
                'completion_date' => '2025-03-15',
                'is_featured' => true,
                'is_published' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'E-Commerce App',
                'slug' => 'e-commerce-app',
                'description' => 'Aplikasi e-commerce modern dengan fitur keranjang belanja, pembayaran, dan manajemen produk.',
                'content' => 'Aplikasi ini memiliki fitur lengkap seperti autentikasi user, manajemen produk, keranjang belanja, checkout dengan Midtrans, dan dashboard admin.',
                'image' => '/images/projects/ecommerce.jpg',
                'images' => json_encode(['/images/projects/ecommerce-1.jpg', '/images/projects/ecommerce-2.jpg']),
                'category' => 'web-development',
                'technologies' => json_encode(['React', 'Laravel', 'MySQL', 'Tailwind CSS', 'Midtrans']),
                'project_url' => 'https://ecommerce.example.com',
                'github_url' => 'https://github.com/username/ecommerce',
                'completion_date' => '2025-02-10',
                'is_featured' => true,
                'is_published' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Mobile POS System',
                'slug' => 'mobile-pos-system',
                'description' => 'Aplikasi Point of Sale untuk UMKM berbasis mobile dengan fitur offline mode.',
                'content' => 'Aplikasi POS mobile yang mendukung transaksi offline, sync data otomatis, dan laporan penjualan real-time.',
                'image' => '/images/projects/pos.jpg',
                'images' => json_encode(['/images/projects/pos-1.jpg', '/images/projects/pos-2.jpg']),
                'category' => 'mobile-development',
                'technologies' => json_encode(['React Native', 'Node.js', 'MongoDB', 'Firebase']),
                'project_url' => null,
                'github_url' => 'https://github.com/username/pos-system',
                'completion_date' => '2025-01-20',
                'is_featured' => false,
                'is_published' => true,
                'sort_order' => 3,
            ],
        ];

        foreach ($projects as $project) {
            Project::updateOrCreate(
                ['slug' => $project['slug']],
                $project
            );
        }

        $this->command->info('Project seeder completed: ' . count($projects) . ' projects');
    }
}