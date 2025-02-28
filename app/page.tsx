"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import PostList from "./components/PostList"
import PostForm from "./components/PostForm"

export default function Home() {
  const [isCreating, setIsCreating] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [key, setKey] = useState(0)
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/auth/user")
      if (res.ok) {
        const userData = await res.json()
        setUser(userData)
      } else {
        router.push("/login")
      }
    }
    checkAuth()
  }, [router])

  const handleSubmitSuccess = () => {
    setKey((prevKey) => prevKey + 1)
    setIsCreating(false)
    setEditingPost(null)
  }

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" })
    if (res.ok) {
      setUser(null)
      router.push("/login")
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-8 p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Posts</h1>
        <div>
          <span className="mr-4">Welcome, {user.username}</span>
          <button onClick={handleLogout} className="btn btn-ghost">
            Logout
          </button>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="btn bg-blue-500 hover:bg-blue-700 text-white" onClick={() => setIsCreating(true)}>
          Create New Post
        </button>
      </div>
      {(isCreating || editingPost) && (
        <PostForm
          post={editingPost}
          onClose={() => {
            setIsCreating(false)
            setEditingPost(null)
          }}
          onSubmitSuccess={handleSubmitSuccess}
          user={user}
        />
      )}
      <PostList key={key} onEdit={setEditingPost} user={user} />
    </div>
  )
}

