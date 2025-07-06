<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:posts,slug'],
            'status' => ['required', Rule::in(['draft', 'published', 'archived'])],
            'author' => ['nullable', 'string', 'max:255'],
            'published_at' => ['nullable', 'date'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'The post title is required.',
            'content.required' => 'The post content is required.',
            'status.in' => 'The status must be one of: draft, published, or archived.',
        ];
    }
}