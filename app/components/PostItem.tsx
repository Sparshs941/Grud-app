interface Post {
  id: number
  title: string
  body: string
  username: string
}

interface PostItemProps {
  post: Post
  onEdit: () => void
  onDelete: () => void
  currentUsername: string
}

export default function PostItem({ post, onEdit, onDelete, currentUsername }: PostItemProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <p>{post.body}</p>
        <p className="text-sm text-gray-500">Posted by: {post.username}</p>
        <div className="card-actions justify-end">
          {post.username === currentUsername && (
            <>
              <button
                className="btn bg-transparent hover:bg-green-500 hover:text-white border-green-500 text-green-500"
                onClick={onEdit}
              >
                Edit
              </button>
              <button
                className="btn bg-transparent hover:bg-red-500 hover:text-white border-red-500 text-red-500"
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this post?")) {
                    onDelete()
                  }
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

