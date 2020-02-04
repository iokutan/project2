import { Component, OnInit } from '@angular/core';
import { OrderServiceService } from '../../services/order-service.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public orders: any [];
  constructor(private orderService: OrderServiceService) { }

  ngOnInit() {
    this.orderService.getAll().subscribe(data => { this.orders = data; });
  }

}
