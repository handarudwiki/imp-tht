'use server'

import { prisma } from '@/lib/prisma'
import { createPostSchema, updatePostSchema,  } from '@/types/index'
import { revalidatePath } from 'next/cache'
import type { ActionResult, CreatePostInput, UpdatePostInput } from '@/types/index'
import z from 'zod'

export async function createPost(data: CreatePostInput): Promise<ActionResult> {
  try {
    console.log('Creating post with data:', data)
   
    const validatedData = createPostSchema.parse(data)

    console.log('Validated data:', validatedData)

    await prisma.post.create({
      data: {
        title: validatedData.title,
        content: validatedData.content!,
        author: validatedData.author,
        isPublished: validatedData.isPublished
      }
    })

    revalidatePath('/posts')
    return { 
      success: true, 
      errors: {},
      message: 'Post created successfully'
    }
  } catch (error) {
    console.error('Error creating post:', error)
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
        message: 'Validation failed'
      }
    }
    
    return {
      success: false,
      errors: { root: ['Failed to create post'] },
      message: 'An error occurred while creating the post'
    }
  }
}

export async function updatePost(id: string, data: UpdatePostInput): Promise<ActionResult> {
  try {
    // Validate input with Zod
    const validatedData = updatePostSchema.parse(data)

    await prisma.post.update({
      where: { id },
      data: {
        title: validatedData.title,
        content: validatedData.content,
        isPublished: validatedData.isPublished
      }
    })

    revalidatePath('/posts')
    return { 
      success: true, 
      errors: {},
      message: 'Post updated successfully'
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
        message: 'Validation failed'
      }
    }
    
    return {
      success: false,
      errors: { root: ['Failed to update post'] },
      message: 'An error occurred while updating the post'
    }
  }
}

export async function deletePost(id: string): Promise<ActionResult> {
  try {
    await prisma.post.delete({
      where: { id }
    })

    revalidatePath('/posts')
    return { 
      success: true, 
      errors: {},
      message: 'Post deleted successfully'
    }
  } catch (error) {
    return {
      success: false,
      errors: { root: ['Failed to delete post'] },
      message: 'An error occurred while deleting the post'
    }
  }
}

export async function togglePostPublished(id: string, published: boolean): Promise<ActionResult> {
  try {
    await prisma.post.update({
      where: { id },
      data: { isPublished: published }
    })

    revalidatePath('/posts')
    return { 
      success: true, 
      errors: {},
      message: `Post ${published ? 'published' : 'unpublished'} successfully`
    }
  } catch (error) {
    return {
      success: false,
      errors: { root: ['Failed to update post status'] },
      message: 'An error occurred while updating the post'
    }
  }
}

export async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return posts
  } catch (error) {
    throw new Error('Failed to fetch posts')
  }
}

export async function getPost(id: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { id }
    })
    return post
  } catch (error) {
    throw new Error('Failed to fetch post')
  }
}