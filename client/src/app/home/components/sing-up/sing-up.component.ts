import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {
  email: string;
  password: string;
  constructor(private loginService: AuthService) { }

  ngOnInit() {
  }

  login(email, password) {
    this.loginService.login(email, password);
  }

}
