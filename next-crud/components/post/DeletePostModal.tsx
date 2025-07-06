"use client"

import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { deletePost } from '@/lib/actions/post'
import {  useTransition } from 'react'
import { toast } from 'react-hot-toast'

interface DeletePostModalProps {
  postId: string | null
  postTitle: string
  isOpen: boolean
  onClose: () => void
}

export function DeletePostModal({ postId, postTitle, isOpen, onClose }: DeletePostModalProps) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = async () => {
    if (!postId) return
    
    startTransition(async () => {
      const result = await deletePost(postId)
      
      if (result.success) {
        toast.success(result.message || 'Post deleted successfully')
        onClose()
      } else {
        toast.error(result.message || 'Failed to delete post')
      }
    })
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Post"
    >
      <div className="space-y-4">
        <p>Are you sure you want to delete "{postTitle}"?</p>
        <p className="text-sm text-base-content/70">
          This action cannot be undone.
        </p>
        
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="error"
            onClick={handleDelete}
            loading={isPending}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  )
}

