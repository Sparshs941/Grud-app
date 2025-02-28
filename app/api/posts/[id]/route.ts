import { NextResponse } from "next/server"
import { fetchFromAPI } from "../../../lib/api"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const post = await fetchFromAPI(`/posts/${params.id}`)
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const updatedPost = await fetchFromAPI(`/posts/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    return NextResponse.json(updatedPost)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await fetchFromAPI(`/posts/${params.id}`, {
      method: "DELETE",
    })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}

