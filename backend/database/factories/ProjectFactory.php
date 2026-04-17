<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProjectFactory extends Factory
{
    protected $model = Project::class;

    public function definition(): array
    {
        $title = $this->faker->sentence(3);
        
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'description' => $this->faker->paragraph(),
            'content' => $this->faker->paragraphs(3, true),
            'image' => $this->faker->imageUrl(),
            'category' => $this->faker->randomElement([
                'web-development', 'mobile-development', 'api-development', 'fullstack'
            ]),
            'technologies' => json_encode($this->faker->randomElements([
                'Laravel', 'React', 'Next.js', 'Tailwind', 'MySQL', 'Docker'
            ], 3)),
            'completion_date' => $this->faker->date(),
            'is_featured' => $this->faker->boolean(20),
            'is_published' => $this->faker->boolean(80),
            'sort_order' => $this->faker->numberBetween(0, 10),
        ];
    }
}