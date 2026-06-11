import { NextResponse } from 'next/server';
import { dbHelper } from '@/lib/db';

export async function GET() {
  try {
    const menu = await dbHelper.getMenu();
    return NextResponse.json(menu);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.id || !body.chefId || !body.name) {
      return NextResponse.json({ error: 'Missing dish details' }, { status: 400 });
    }
    const saved = await dbHelper.saveDish(body);
    return NextResponse.json(saved);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing dish ID' }, { status: 400 });
    }
    await dbHelper.deleteDish(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
