import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {
  email: string;
  password: string;
  loginForm: FormGroup;

  constructor(private loginService: AuthService,
              private fb: FormBuilder,
              private router: Router, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      password: ['99032', Validators.required],
      email: ['admin@gmail.com', [Validators.required, Validators.pattern('[a-z0-9.@]*')]]
    });
  }

  login(form: FormGroup) {
    console.log(form);
    this.loginService.login(
      form.get('email').value,
      form.get('password').value)
    .subscribe(
      (data) => {
          this.router.navigate(['/dashboard'], { relativeTo: this.route });
      },
      (error) => {
        console.log('login was not successfull');
      }
    );
  }

}
