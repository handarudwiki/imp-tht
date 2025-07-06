<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;

class PostController extends Controller
{
    /**
     * Display a listing of posts
     */
    public function index(Request $request): View
    {
        $query = Post::query();

        // Filter by status if provided
        if ($request->has('status') && $request->status !== '') {
            $query->byStatus($request->status);
        }

        // Search by title or content
        if ($request->has('search') && $request->search !== '') {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'LIKE', "%{$search}%")
                  ->orWhere('content', 'LIKE', "%{$search}%");
            });
        }

        // Order by latest
        $query->latest();

        // Paginate results
        $posts = $query->paginate(12)->withQueryString();

        return view('posts.index', compact('posts'));
    }

    /**
     * Show the form for creating a new post
     */
    public function create(): View
    {
        return view('posts.create');
    }

    /**
     * Store a newly created post
     */
    public function store(StorePostRequest $request): RedirectResponse
    {
        $post = Post::create($request->validated());

        return redirect()->route('posts.show', $post)
            ->with('success', 'Post created successfully!');
    }

    /**
     * Display the specified post
     */
    public function show(Post $post): View
    {
        return view('posts.show', compact('post'));
    }

    /**
     * Show the form for editing the specified post
     */
    public function edit(Post $post): View
    {
        return view('posts.edit', compact('post'));
    }

    /**
     * Update the specified post
     */
    public function update(UpdatePostRequest $request, Post $post): RedirectResponse
    {
        $post->update($request->validated());

        return redirect()->route('posts.show', $post)
            ->with('success', 'Post updated successfully!');
    }

    /**
     * Remove the specified post
     */
    public function destroy(Post $post): RedirectResponse
    {
        $post->delete();

        return redirect()->route('posts.index')
            ->with('success', 'Post deleted successfully!');
    }

    /**
     * Display post by slug
     */
    public function showBySlug(string $slug): View
    {
        $post = Post::where('slug', $slug)->firstOrFail();
        return view('posts.show', compact('post'));
    }
}
