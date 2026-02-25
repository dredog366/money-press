import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { products } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const product = await db.select().from(products).where(eq(products.id, id));

    if (!product.length) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product[0]);
  } catch (error) {
    console.error('GET /api/products/[id] error:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();

    const result = await db
      .update(products)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning();

    if (!result.length) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('PATCH /api/products/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    const result = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning();

    if (!result.length) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted' });
  } catch (error) {
    console.error('DELETE /api/products/[id] error:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
