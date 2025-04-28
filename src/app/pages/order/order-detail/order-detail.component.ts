import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/order/order.service';
import { Order } from '../../../models/order/order.model';
import { OrderDetail } from '../../../models/order-detail/order-detail.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent implements OnInit {
  order: Order | null = null;
  detailColumns: string[] = ['product', 'quantity', 'subtotal'];
  dataSource = new MatTableDataSource<OrderDetail>([]);

  constructor(
    private route: ActivatedRoute,
    private _orderService: OrderService,
    public dialogRef: MatDialogRef<OrderDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order
  ) {}

  ngOnInit(): void {
    this._orderService.getOrder(this.data.id).subscribe(({ data }) => {
      this.order = data;
      this.dataSource.data = data.details || [];
    });
  }
}
