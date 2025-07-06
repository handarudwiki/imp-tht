// src/components/posts/EditPostModal.tsx
'use client'

import { Modal } from '@/components/ui/Modal'
import { PostForm } from './PostForm'
import { updatePost } from '@/lib/actions/post'
import { Post, UpdatePostInput, ActionResult } from '@/types/index'
import { toast } from 'react-hot-toast'

interface EditPostModalProps {
  post: Post | null
  isOpen: boolean
  onClose: () => void
}

export function EditPostModal({ post, isOpen, onClose }: EditPostModalProps) {
  const handleSubmit = async (data: UpdatePostInput): Promise<ActionResult> => {
    if (!post) return { success: false, errors: { root: ['No post selected'] } }
    
    const result = await updatePost(post.id, data)
    
    if (result.success) {
      onClose()
      toast.success(result.message || 'Post updated successfully')
    } else {
      toast.error(result.message || 'Failed to update post')
    }
    
    return result
  }

  if (!post) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Post"
    >
      <PostForm
        post={post}
        onSubmit={handleSubmit}
        onCancel={onClose}
        submitLabel="Update Post"
      />
    </Modal>
  )
}