import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product/product.service';
import { OrderService } from '../../../services/order/order.service';
import { Order, OrderDto } from '../../../models/order/order.model';
import { Product } from '../../../models/product/product.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;
  products: Product[] = [];
  total = 0;
  mode: 'create' | 'update';
  order?: Order;

  constructor(
    private fb: FormBuilder,
    private _productService: ProductService,
    private _orderService: OrderService,
    public dialogRef: MatDialogRef<OrderFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'create' | 'update'; order?: Order }
  ) {
    this.mode = data.mode;
    this.order = data.order;
    this.orderForm = this.fb.group({
      details: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this._productService.getProducts().subscribe(({ data }) => {
      this.products = data;
      if (this.mode === 'update' && this.order) {
        this.updateDetail();
      } else {
        this.addDetail();
      }
    });
  }

  get details(): FormArray {
    return this.orderForm.get('details') as FormArray;
  }

  addDetail(): void {
    const detail = this.fb.group({
      productId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });

    detail.get('productId')?.valueChanges.subscribe(() => {
      this.calculateTotal();
    });
    detail.get('quantity')?.valueChanges.subscribe(() => {
      this.calculateTotal();
    });

    this.details.push(detail);
    this.calculateTotal();
  }

  removeDetail(index: number): void {
    this.details.removeAt(index);
    this.calculateTotal();
  }

  getSubtotal(index: number): number {
    const detail = this.details.at(index);
    const product = this.products.find(p => p.id === +detail.get('productId')?.value);
    const quantity = detail.get('quantity')?.value;
    return product ? product.price * quantity : 0;
  }

  calculateTotal(): void {
    this.total = this.details.controls.reduce((sum, _, index) => sum + this.getSubtotal(index), 0);
  }

  updateDetail(): void {
    if (this.order?.details) {
      this.order.details.forEach(detail => {
        const detailGroup = this.fb.group({
          productId: [detail.product.id, Validators.required],
          quantity: [detail.quantity, [Validators.required, Validators.min(1)]]
        });

        detailGroup.get('productId')?.valueChanges.subscribe(() => {
          this.calculateTotal();
        });
        detailGroup.get('quantity')?.valueChanges.subscribe(() => {
          this.calculateTotal();
        });

        this.details.push(detailGroup);
      });
      this.calculateTotal();
    }
  }

  save(): void {
    if (this.orderForm.valid) {
      const orderDto: OrderDto = this.orderForm.value;
      const request = this.mode === 'create'
        ? this._orderService.createOrder(orderDto)
        : this._orderService.updateOrder(this.order!.id, orderDto);

      request.subscribe(() => {
        Swal.fire({
          title: "Orden",
          text: `Se ha ${this.mode === 'create' ? 'creado' : 'actualizado'} exitosamente la orden`,
          icon: 'success',
          confirmButtonText: 'Ok',
          showConfirmButton: true,
          showDenyButton: false
        }).then(() => {
          this.dialogRef.close(true);
        });
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
