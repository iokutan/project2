import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  istokenExpired: boolean;
  constructor(private tokenService: TokenService) { }

  ngOnInit() {
  
  }

}
