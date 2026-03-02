export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  regularPrice: number;
  salePrice?: number;
  imageUrl: string;
  images: string[];
  category: string;
  sku: string;
  inStock: boolean;
  stockQuantity: number;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
