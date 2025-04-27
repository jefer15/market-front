import { Product } from "../product/product.model";

export interface OrderDetail {
  id: number;
  product: Product;
  quantity: number;
  subtotal: number;
  created_at: string;
}

export interface OrderDetailDto {
  productId: number;
  quantity: number;
}
