@extends('layouts.app')

@section('title', $post->title)

@section('content')
<div class="row">
    <div class="col-md-8 mx-auto">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h1 class="card-title mb-0">{{ $post->title }}</h1>
                <span class="badge bg-{{ $post->status == 'published' ? 'success' : ($post->status == 'draft' ? 'warning' : 'secondary') }}">
                    {{ ucfirst($post->status) }}
                </span>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <small class="text-muted">
                        <i class="fas fa-calendar"></i> Created: {{ $post->created_at->format('M d, Y \a\t g:i A') }}
                        @if($post->updated_at != $post->created_at)
                            <br><i class="fas fa-edit"></i> Updated: {{ $post->updated_at->format('M d, Y \a\t g:i A') }}
                        @endif
                        @if($post->published_at)
                            <br><i class="fas fa-globe"></i> Published: {{ $post->published_at->format('M d, Y \a\t g:i A') }}
                        @endif
                    </small>
                </div>
                
                <div class="post-content">
                    {!! nl2br(e($post->content)) !!}
                </div>
            </div>
            <div class="card-footer">
                <div class="btn-group" role="group">
                    <a href="{{ route('posts.index') }}" class="btn btn-outline-secondary">
                        <i class="fas fa-arrow-left"></i> Back to Posts
                    </a>
                    <a href="{{ route('posts.edit', $post) }}" class="btn btn-outline-warning">
                        <i class="fas fa-edit"></i> Edit Post
                    </a>
                    <form method="POST" action="{{ route('posts.destroy', $post) }}" class="d-inline">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-outline-danger" 
                                onclick="return confirm('Are you sure you want to delete this post?')">
                            <i class="fas fa-trash"></i> Delete Post
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
