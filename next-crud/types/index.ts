import { z } from 'zod'

export const createPostSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  content: z.string().min(0, 'Content cannot be empty').optional(),
  author: z.string().min(1, 'Author is required'),
  isPublished: z.boolean().default(false)
})

export const updatePostSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  content: z.string().min(0, 'Content cannot be empty'),
  author : z.string().min(1, 'Author is required'),
  isPublished: z.boolean().default(false)
})

// TypeScript Types
export type CreatePostInput = z.infer<typeof createPostSchema>
export type UpdatePostInput = z.infer<typeof updatePostSchema>

export interface Post {
  id: string
  title: string
  content: string 
  isPublished: boolean
  author: string
  createdAt: Date
  updatedAt: Date
}

export interface ActionResult {
  success: boolean
  errors: Record<string, string[]>
  message?: string
}