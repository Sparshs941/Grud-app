import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

// In a real application, you would fetch users from a database
const users: any[] = []

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    // Find user
    const user = users.find((user) => user.username === username)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 })
    }

    // In a real application, you would generate and return a JWT token here
    return NextResponse.json({ username: user.username }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "An error occurred during login" }, { status: 500 })
  }
}

