import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, ActivationEnd } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  path: string = 'PRODUCTS > CATEGORY-LIST';
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(e => {
      if(e instanceof NavigationEnd){
        const a = e.url.split('/').map(a => a.toUpperCase());
        if(a[a.length-1].length < 25 && a[a.length-3]) {
          this.path = `${a[a.length-3]} > ${a[a.length-2]} > ${a[a.length-1]}`;
        } 
        else if(a[a.length-1].length < 25 && !a[a.length-3]){
          this.path = `${a[a.length-2]} > ${a[a.length-1]}`;
        }
        else {
          this.path = `${a[a.length-2]}`;
        }
      }
    });
  }

}
