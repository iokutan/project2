import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  trackingForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  createTrackingForm() {
    this.trackingForm = this.fb.group({
      orderNo: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.createTrackingForm();
  }

  add() {
    if (this.trackingForm.valid) {

    }
  }
}
