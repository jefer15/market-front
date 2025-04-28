import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../../models/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `${environment.uri}/product`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<{ statusCode: number; data: Product[] }> {
    return this.http.get<{ statusCode: number; data: Product[] }>(this.apiUrl);
  }
}
