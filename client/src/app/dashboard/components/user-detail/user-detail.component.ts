import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  userForm: FormGroup;

  constructor(private userService: UserService,
              private fb: FormBuilder) { }

  createUserForm() {
    this.userForm = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', Validators.required],
    username: ['', Validators.required],
    adress: ['', Validators.required],
    country: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required],

    });
  }

  ngOnInit() {
    this.createUserForm();
  }

  add() {
    if (this.userForm.valid) {

    }
  }
}
