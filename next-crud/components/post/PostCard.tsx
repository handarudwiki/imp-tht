// src/components/posts/PostCard.tsx
import { Post } from '@/types/index'
import { Button } from '@/components/ui/Button'

interface PostCardProps {
  post: Post
  onEdit: (post: Post) => void
  onDelete: (id: string) => void
  onTogglePublished: (id: string, published: boolean) => void
}

export function PostCard({ post, onEdit, onDelete, onTogglePublished }: PostCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <h2 className="card-title">
            {post.title}
            {post.isPublished && (
              <div className="badge badge-success">Published</div>
            )}
          </h2>
        </div>
        
        {post.content && (
          <p className="text-base-content/70 line-clamp-3">{post.content}</p>
        )}
        
        <div className="text-sm text-base-content/50 mt-2">
          <p>By: {post.author}</p>
          <p>Created: {new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
        
        <div className="card-actions justify-end mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onTogglePublished(post.id, !post.isPublished)}
          >
            {post.isPublished ? 'Unpublish' : 'Publish'}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(post)}
          >
            Edit
          </Button>
          <Button
            variant="error"
            size="sm"
            onClick={() => onDelete(post.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}