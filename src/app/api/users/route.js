import { NextResponse } from 'next/server';
import { dbHelper } from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.email || !body.role) {
      return NextResponse.json({ error: 'Missing email or role' }, { status: 400 });
    }
    const saved = await dbHelper.saveUser(body);
    return NextResponse.json(saved);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }
    const users = await dbHelper.getUsers();
    const user = users.find(u => u.email === email.toLowerCase().trim());
    return NextResponse.json(user || null);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
