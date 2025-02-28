"use client"

import { useState } from "react"

interface Post {
  id?: number
  title: string
  body: string
  username: string
}

interface PostFormProps {
  post?: Post | null
  onClose: () => void
  onSubmitSuccess: () => void
  username: string
}

export default function PostForm({ post, onClose, onSubmitSuccess, username }: PostFormProps) {
  const [title, setTitle] = useState(post?.title || "")
  const [body, setBody] = useState(post?.body || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const url = post ? `/api/posts/${post.id}` : "/api/posts"
    const method = post ? "PUT" : "POST"

    try {
      const response = await fetch(url, {
        method,
        body: JSON.stringify({
          title,
          body,
          username,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to submit post")
      }

      onSubmitSuccess()
    } catch (err) {
      setError("An error occurred while submitting the post")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">{post ? "Edit Post" : "Create New Post"}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="body" className="block text-sm font-medium text-gray-700">
              Body
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

