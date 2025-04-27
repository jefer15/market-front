import { OrderDetail, OrderDetailDto } from "../order-detail/order-detail.model";

export interface Order {
  id: number;
  total: number;
  created_at: string;
  details: OrderDetail[];
}

export interface OrderDto {
  details: OrderDetailDto[];
}

