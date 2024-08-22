import { NextResponse } from 'next/server'
 
export async function GET(Request) {
  return NextResponse.json({ msg: 'Hello from server' })
}
