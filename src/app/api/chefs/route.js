import { NextResponse } from 'next/server';
import { dbHelper } from '@/lib/db';

export async function GET() {
  try {
    const chefs = await dbHelper.getChefs();
    return NextResponse.json(chefs);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.id || !body.name) {
      return NextResponse.json({ error: 'Missing ID or Name' }, { status: 400 });
    }
    const saved = await dbHelper.saveChef(body);
    return NextResponse.json(saved);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
