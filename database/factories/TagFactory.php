<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tag>
 */
class TagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->unique()->randomElement([
            'Technology', 'Programming', 'Web Development', 'Mobile Apps', 'AI & Machine Learning',
            'Business', 'Entrepreneurship', 'Marketing', 'Finance', 'Productivity',
            'Design', 'UX/UI', 'Graphics', 'Photography', 'Art',
            'Lifestyle', 'Health', 'Fitness', 'Travel', 'Food',
            'Education', 'Career', 'Personal Development', 'Leadership', 'Innovation',
            'Science', 'Environment', 'Sustainability', 'Energy', 'Climate',
            'News', 'Politics', 'Economy', 'Society', 'Culture'
        ]);
        
        return [
            'name' => $name,
            'slug' => Str::slug($name),
        ];
    }
}