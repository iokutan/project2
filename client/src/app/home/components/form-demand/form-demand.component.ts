import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-form-demand',
  templateUrl: './form-demand.component.html',
  styleUrls: ['./form-demand.component.css']
})
export class FormDemandComponent implements OnInit {
  demandForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  createDemandForm() {
    this.demandForm = this.fb.group({
    description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.createDemandForm();
  }

  add() {
    if (this.demandForm.valid) {

    }
  }

}
