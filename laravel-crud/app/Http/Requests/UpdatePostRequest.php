<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'content' => ['sometimes', 'required', 'string'],
            'slug' => ['sometimes', 'string', 'max:255', Rule::unique('posts', 'slug')->ignore($this->post)],
            'status' => ['sometimes', 'required', Rule::in(['draft', 'published', 'archived'])],
            'author' => ['sometimes', 'nullable', 'string', 'max:255'],
            'published_at' => ['sometimes', 'nullable', 'date'],
        ];
    }
}
