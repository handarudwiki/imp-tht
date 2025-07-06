// src/app/posts/page.tsx
import { getPosts } from '@/lib/actions/post'
import { PostList } from '@/components/post/PostList'

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className="container mx-auto px-4 py-8">
      <PostList posts={posts} />
    </div>
  )
}