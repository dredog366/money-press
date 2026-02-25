import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { products } from '@/db/schema';
import { desc, eq, and, gte, lte } from 'drizzle-orm';
import { CreateProductSchema } from '@/lib/validations';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = db.select().from(products).where(eq(products.active, true));

    if (category) {
      query = query.where(eq(products.category, category as any));
    }

    if (minPrice || maxPrice) {
      const conditions = [];
      if (minPrice) conditions.push(gte(products.price, minPrice));
      if (maxPrice) conditions.push(lte(products.price, maxPrice));
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }
    }

    const data = await query.orderBy(desc(products.createdAt)).limit(limit).offset(offset);

    return NextResponse.json(data);
  } catch (error) {
    console.error('GET /api/products error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = CreateProductSchema.parse(body);

    const result = await db.insert(products).values({
      name: validated.name,
      description: validated.description,
      price: validated.price,
      cost: validated.cost,
      category: validated.category,
      stock: validated.stock,
      imageUrl: validated.imageUrl,
      sku: validated.sku,
    }).returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('POST /api/products error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 400 });
  }
}
