import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderServiceService } from '../../services/order-service.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.css']
})
export class OrdersDetailComponent implements OnInit {
  orderForm: FormGroup;
  param: any;
  order: any;

  statuses: any[] = [
   { id: 0, name: 'started'},
   { id: 1, name: 'in process' },
   { id: 2, name: 'ready' },
   { id: 3, name: 'cancelled' }
  ];

  constructor(private orderService: OrderServiceService,
    private route: ActivatedRoute,
              private fb: FormBuilder) { }

  createOrderForm() {
    this.orderForm = this.fb.group({
      status: [ '', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.param = params['id'];
      this.getOrderWithDetails();
    });
    this.createOrderForm();
  }

  getOrderWithDetails(){
    this.orderService.getById(this.param).subscribe(data => {
      this.order = data;
      this.order.status = this.statuses.find(a => a.id == this.order.status);
      this.orderForm.get('status').setValue(this.order.status)
    });
  }

  update() {
    if (this.orderForm.valid) {
      this.order.status = this.orderForm.get('status').value.id;
      this.orderService.update(this.order).subscribe(data => {
        this.getOrderWithDetails();
      });
    }
  }

}
