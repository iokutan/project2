import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-form-purchase-gold',
  templateUrl: './form-purchase-gold.component.html',
  styleUrls: ['./form-purchase-gold.component.css']
})
export class FormPurchaseGoldComponent implements OnInit {
  goldForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  createGoldForm() {
    this.goldForm = this.fb.group({
    schmuckart: ['', Validators.required],
    gewicht: ['', Validators.required],
    edelsteine: ['', Validators.required],
    feingehalt: ['', Validators.required],
    zertifikat: ['', Validators.required],
    zustand: ['', Validators.required],
    preis: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.createGoldForm();
  }

  add() {
    if (this.goldForm.valid) {

    }
  }

}
