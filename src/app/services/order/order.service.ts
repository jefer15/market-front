import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Order, OrderDto } from '../../models/order/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = `${environment.uri}/order`;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<{ statusCode: number; data: Order[] }> {
    return this.http.get<{ statusCode: number; data: Order[] }>(this.apiUrl);
  }

  getOrder(id: number): Observable<{ statusCode: number; data: Order }> {
    return this.http.get<{ statusCode: number; data: Order }>(`${this.apiUrl}/${id}`);
  }

  createOrder(order: OrderDto): Observable<{ statusCode: number; data: Order }> {
    return this.http.post<{ statusCode: number; data: Order }>(this.apiUrl, order);
  }

  updateOrder(id: number, order: OrderDto): Observable<{ statusCode: number; data: Order }> {
    return this.http.put<{ statusCode: number; data: Order }>(`${this.apiUrl}/${id}`, order);
  }

  deleteOrder(id: number): Observable<{ statusCode: number; message: string }> {
    return this.http.delete<{ statusCode: number; message: string }>(`${this.apiUrl}/${id}`);
  }
}
