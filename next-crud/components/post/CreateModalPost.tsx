// src/components/posts/CreatePostModal.tsx
'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { PostForm } from './PostForm'
import { createPost } from '@/lib/actions/post'
import { Button } from '@/components/ui/Button'
import { CreatePostInput, ActionResult } from '@/types/index'
import { toast } from 'react-hot-toast'

export function CreatePostModal() {
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = async (data: CreatePostInput): Promise<ActionResult> => {
    const result = await createPost(data)
    
    if (result.success) {
      setIsOpen(false)
      toast.success(result.message || 'Post created successfully')
    } else {
        console.error('Create post error:', result.errors)
      toast.error(result.message || 'Failed to create post')
    }
    
    return result
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Create New Post
      </Button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create New Post"
      >
        <PostForm
          onSubmit={handleSubmit}
          onCancel={() => setIsOpen(false)}
          submitLabel="Create Post"
        />
      </Modal>
    </>
  )
}