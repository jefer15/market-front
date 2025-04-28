import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order/order.service';
import { Order } from '../../models/order/order.model';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  displayedColumns: string[] = ['id', 'total', 'created_at', 'actions'];
  dataSource = new MatTableDataSource<Order>([]);

  constructor(
    private _orderService: OrderService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this._orderService.getOrders().subscribe(({ data }) => {
      this.dataSource.data = data;
    });
  }

  openCreateOrderModal(): void {
    const dialogRef = this.dialog.open(OrderFormComponent, {
      width: '600px',
      data: { mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadOrders();
      }
    });
  }

  openUpdateOrderModal(order: Order): void {
    const dialogRef = this.dialog.open(OrderFormComponent, {
      width: '600px',
      data: { mode: 'update', order }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadOrders();
      }
    });
  }

  openDetailOrden(order: Order): void {
    const dialogRef = this.dialog.open(OrderDetailComponent, {
      width: '600px',
      data: order
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadOrders();
      }
    });
  }

  deleteOrder(id: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this._orderService.deleteOrder(id).subscribe(() => {
        this.loadOrders();
      });
    }
  }
}
