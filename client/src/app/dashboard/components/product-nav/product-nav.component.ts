import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, ActivationEnd } from '@angular/router';

@Component({
  selector: 'cristal-product-nav',
  templateUrl: './product-nav.component.html',
  styleUrls: ['./product-nav.component.css']
})
export class ProductNavComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

}
