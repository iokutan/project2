import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-form-contact',
  templateUrl: './form-contact.component.html',
  styleUrls: ['./form-contact.component.css']
})
export class FormContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  createContactForm() {
    this.contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    telefon: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.createContactForm();
  }

  add() {
    if (this.contactForm.valid) {

    }
  }
}
