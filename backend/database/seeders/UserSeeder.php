<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@chairulikhsanworks.my.id',
            'password' => Hash::make('p4sw0rdku4tbackend'),
        ]);
    }
}