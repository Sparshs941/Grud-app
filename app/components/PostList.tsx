"use client"

import { useState, useEffect } from "react"
import PostItem from "./PostItem"

interface Post {
  id: number
  title: string
  body: string
  username: string
}

interface PostListProps {
  onEdit: (post: Post) => void
  username: string
}

export default function PostList({ onEdit, username }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts")
      if (!response.ok) {
        throw new Error("Failed to fetch posts")
      }
      const data = await response.json()
      setPosts(data)
      setIsLoading(false)
    } catch (err) {
      setError("An error occurred while fetching posts")
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Failed to delete post")
      }
      setPosts(posts.filter((post) => post.id !== id))
    } catch (err) {
      setError("An error occurred while deleting the post")
    }
  }

  if (isLoading) {
    return <div className="text-center">Loading...</div>
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onEdit={() => onEdit(post)}
          onDelete={() => handleDelete(post.id)}
          currentUsername={username}
        />
      ))}
    </div>
  )
}

