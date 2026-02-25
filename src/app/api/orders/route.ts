import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders, orderItems } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { CreateOrderSchema } from '@/lib/validations';

function generateOrderNumber(): string {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = db.select().from(orders);

    if (status) {
      query = query.where(eq(orders.status, status as any));
    }

    const data = await query.limit(limit).offset(offset);

    return NextResponse.json(data);
  } catch (error) {
    console.error('GET /api/orders error:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = CreateOrderSchema.parse(body);

    const orderNumber = generateOrderNumber();

    const result = await db.insert(orders).values({
      orderNumber,
      customerEmail: validated.customerEmail,
      customerName: validated.customerName,
      totalPrice: validated.totalPrice,
      shippingAddress: validated.shippingAddress,
    }).returning();

    const order = result[0];

    // Insert order items
    for (const item of validated.items) {
      await db.insert(orderItems).values({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        priceAtPurchase: '0', // Should be fetched from product
      });
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('POST /api/orders error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 400 });
  }
}
