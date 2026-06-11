import { NextResponse } from 'next/server';
import { dbHelper } from '@/lib/db';

export async function GET() {
  try {
    const orders = await dbHelper.getOrders();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ error: 'Missing order ID' }, { status: 400 });
    }
    const saved = await dbHelper.saveOrder(body);
    return NextResponse.json(saved);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
