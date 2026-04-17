<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::updateOrCreate(
        //     ['email' => 'admin@example.com'],
        //     [
        //         'name' => 'Chairul Ikhsan',
        //         'email' => 'chairulikhsan23@student.polindra.ac.id',
        //         'password' => Hash::make('password123'),
        //     ]
        // );

        $this->command->info('Admin user created: chairulikhsan23@student.polindra.ac.id / password123');

        $this->call([
            ProjectSeeder::class,
            ExperienceSeeder::class,
            EducationSeeder::class,
            CertificateSeeder::class,
        ]);

        $this->command->info('All seeders completed!');
        
    }
}
