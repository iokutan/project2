import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-form-purchase-watch',
  templateUrl: './form-purchase-watch.component.html',
  styleUrls: ['./form-purchase-watch.component.css']
})
export class FormPurchaseWatchComponent implements OnInit {
  watchForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  createwatchForm() {
    this.watchForm = this.fb.group({
    marke: ['', Validators.required],
    zertifikat: ['', Validators.required],
    preis: ['', Validators.required],
    zustand: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.createwatchForm();
  }

  add() {
    if (this.watchForm.valid) {

    }
  }

}
