<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        // Create 50 posts with various statuses
        Post::factory(30)->published()->create();
        Post::factory(15)->draft()->create();
        Post::factory(5)->create(['status' => 'archived']);
    }
}
