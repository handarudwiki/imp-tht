'use client'

import { useState } from 'react'
import { Post } from '@/types/index'
import { PostCard } from './PostCard'
import { CreatePostModal } from './CreateModalPost'
import { EditPostModal } from './EditPostModal'
import { DeletePostModal } from './DeletePostModal'
import { togglePostPublished } from '@/lib/actions/post'

interface PostListProps {
  posts: Post[]
}

export function PostList({ posts }: PostListProps) {
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [deletingPost, setDeletingPost] = useState<{ id: string; title: string } | null>(null)

  const handleEdit = (post: Post) => {
    setEditingPost(post)
  }

  const handleDelete = (id: string) => {
    const post = posts.find(p => p.id === id)
    if (post) {
      setDeletingPost({ id, title: post.title })
    }
  }

  const handleTogglePublished = async (id: string, published: boolean) => {
    await togglePostPublished(id, published)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Posts</h1>
        <CreatePostModal />
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-base-content/70">No posts found.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onTogglePublished={handleTogglePublished}
            />
          ))}
        </div>
      )}

      <EditPostModal
        post={editingPost}
        isOpen={!!editingPost}
        onClose={() => setEditingPost(null)}
      />

      <DeletePostModal
        postId={deletingPost?.id || null}
        postTitle={deletingPost?.title || ''}
        isOpen={!!deletingPost}
        onClose={() => setDeletingPost(null)}
      />
    </div>
  )
}