import { NextResponse } from 'next/server'

// This Next.js API route reads scan data from localStorage on the client side
// It's used as a fallback when the Python backend is unavailable.
// The actual data aggregation happens in the frontend component.

export async function GET() {
  return NextResponse.json({
    message: 'Use client-side localStorage for stats when backend is unavailable.'
  })
}
