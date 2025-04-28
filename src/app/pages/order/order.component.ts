import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order/order.service';
import { Order } from '../../models/order/order.model';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import Swal from 'sweetalert2';

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
    MatDialogModule,
    MatMenuModule,
    MatPaginatorModule
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  displayedColumns: string[] = ['id', 'total', 'created_at', 'actions'];
  dataSource = new MatTableDataSource<Order>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _orderService: OrderService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this._orderService.getOrders().subscribe(({ data }) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  openCreateOrderModal(): void {
    const dialogRef = this.dialog.open(OrderFormComponent, {
      width: '900px',
      data: { mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }

  openUpdateOrderModal(order: Order): void {
    const dialogRef = this.dialog.open(OrderFormComponent, {
      width: '900px',
      data: { mode: 'update', order }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
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
        this.getData();
      }
    });
  }

  deleteOrder(id: number): void {
    this._orderService.deleteOrder(id).subscribe(() => {
      Swal.fire({
        title: "Ordenes",
        text: "Se ha eliminado exitosamente la orden",
        icon: 'success',
        confirmButtonText: 'Ok',
        showConfirmButton: true,
        showDenyButton: false
      }).then((result) => {
        this.getData();
      });
    });
  }
}
