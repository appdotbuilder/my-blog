<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Tag;
use App\Models\User;
use App\Models\Subscription;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@blog.com',
            'password' => bcrypt('password'),
            'is_admin' => true,
            'email_notifications' => true,
        ]);

        // Create regular users
        $users = User::factory(20)->create();
        
        // Create some premium users
        $premiumUsers = $users->take(8);
        foreach ($premiumUsers as $user) {
            Subscription::factory()
                ->premium()
                ->active()
                ->create(['user_id' => $user->id]);
        }

        // Create tags
        $tags = Tag::factory(20)->create();

        // Create articles by admin
        $adminArticles = Article::factory(15)
            ->create(['user_id' => $admin->id]);

        // Create articles by regular users (fewer)
        $userArticles = Article::factory(5)
            ->create(['user_id' => $users->random()->id]);

        // Attach random tags to articles
        $allArticles = $adminArticles->concat($userArticles);
        foreach ($allArticles as $article) {
            $article->tags()->attach(
                $tags->random(random_int(1, 4))->pluck('id')->toArray()
            );
        }

        // Create some premium articles (about 30% of total)
        $premiumCount = (int) ($allArticles->count() * 0.3);
        $allArticles->random($premiumCount)->each(function ($article) {
            $article->update(['is_premium' => true]);
        });
    }
}