import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, ActivationEnd } from '@angular/router';

@Component({
  selector: 'cristal-artikels-nav',
  templateUrl: './artikels-nav.component.html',
  styleUrls: ['./artikels-nav.component.css']
})
export class ArtikelsNavComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

}
