import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

// In a real application, you would use a database to store users
const users: any[] = []

export async function POST(request: Request) {
  try {
    const { name, username, email, password } = await request.json()

    // Check if user already exists
    if (users.find((user) => user.username === username || user.email === email)) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = { name, username, email, password: hashedPassword }
    users.push(newUser)

    return NextResponse.json({ message: "User created successfully" }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "An error occurred during signup" }, { status: 500 })
  }
}

