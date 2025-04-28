import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product/product.service';
import { Product } from '../../../models/product/product.model';

@Component({
  selector: 'app-top-products',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './top-products.component.html',
  styleUrl: './top-products.component.scss'
})
export class TopProductsComponent implements OnInit {
  topProducts: Product[] = [];
  isLoading = true;

  constructor(
    private _productService: ProductService,
    public dialogRef: MatDialogRef<TopProductsComponent>
  ) {}

  ngOnInit(): void {
    this.fetchTopProducts();
  }

  private fetchTopProducts(): void {
    this.isLoading = true;
    this._productService.getTop3().subscribe({
      next: ({ data }) => {
        this.topProducts = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load top products:', err);
        this.isLoading = false;
      }
    });
  }

  downloadPdf(): void {
    this._productService.downloadTop3Pdf().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'top-3-products.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Failed to download PDF:', err);
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
