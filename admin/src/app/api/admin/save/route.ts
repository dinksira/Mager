import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000';

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();

    const res = await fetch(`${BACKEND_URL}/api/content`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Backend save failed');
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Save error:', error);
    return NextResponse.json({ ok: false, error: 'Failed to save' }, { status: 500 });
  }
}
