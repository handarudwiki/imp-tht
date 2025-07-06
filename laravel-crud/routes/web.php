<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('posts.index');
});

// Web routes for posts
Route::resource('posts', PostController::class);

// Additional route for slug-based posts
Route::get('posts/slug/{slug}', [PostController::class, 'showBySlug'])->name('posts.slug');

