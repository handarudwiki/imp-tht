'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormField } from '@/components/ui/FormField'
import { Button } from '@/components/ui/Button'
import { Post, CreatePostInput, UpdatePostInput, createPostSchema, updatePostSchema, ActionResult } from '@/types/index'
import { useTransition } from 'react'

interface PostFormProps {
  post?: Post
  onSubmit: (data: CreatePostInput | UpdatePostInput) => Promise<ActionResult>
  onCancel?: () => void
  submitLabel?: string
}

export function PostForm({ post, onSubmit, onCancel, submitLabel = 'Save' }: PostFormProps) {
  const [isPending, startTransition] = useTransition()
  const isEditing = !!post

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<CreatePostInput | UpdatePostInput>({
    resolver: zodResolver(isEditing ? updatePostSchema : createPostSchema),
    defaultValues: isEditing ? {
      title: post.title,
      content: post.content || '',
      author : post.author || '',
      isPublished: post.published,
    } : {
      title: '',
      content: '',
      author: '',
      isPublished: false
    }
  })

  const handleFormSubmit = async (data: CreatePostInput | UpdatePostInput) => {
    startTransition(async () => {
      const result = await onSubmit(data)
      
      if (!result.success) {
        // Set field-specific errors
        Object.entries(result.errors).forEach(([field, messages]) => {
          if (field === 'root') {
            setError('root', { message: messages[0] })
          } else {
            setError(field as any, { message: messages[0] })
          }
        })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {errors.root && (
        <div className="alert alert-error">
          <span>{errors.root.message}</span>
        </div>
      )}

      <FormField
        label="Title"
        type="text"
        placeholder="Enter post title"
        required
        error={errors.title}
        {...register('title')}
      />

      <FormField
        label="Content"
        type="textarea"
        placeholder="Enter post content"
        required
        error={errors.content}
        {...register('content')}
      />

      {!isEditing && (
        <FormField
          label="Author"
          type="text"
          placeholder="Enter author"
          required
          error={errors.author}
          {...register('author')}
        />
      )}

      <div className="form-control">
        <label className="label cursor-pointer justify-start gap-2">
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            {...register('isPublished')}
          />
          <span className="label-text">Published</span>
        </label>
      </div>

      <div className="flex gap-2 justify-end">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" loading={isPending || isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}