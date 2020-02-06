import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderServiceService } from '../../services/order-service.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.css']
})
export class OrdersDetailComponent implements OnInit {
  orderForm: FormGroup;

  constructor(private orderService: OrderServiceService,
              private fb: FormBuilder) { }

  createOrderForm() {
    this.orderForm = this.fb.group({
    titel: ['', Validators.required],
    description: ['', Validators.required],
    date: ['', Validators.required],
    price: ['', Validators.required],
    status: ['', Validators.required],
    image: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.createOrderForm();
  }

  add() {
    if (this.orderForm.valid) {

    }
  }

}
