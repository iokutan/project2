import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cristal-dash-header',
  templateUrl: './dash-header.component.html',
  styleUrls: ['./dash-header.component.css']
})
export class DashHeaderComponent implements OnInit {

  constructor(private loginService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  logout(event){
    this.loginService.logout().subscribe(() => {
      localStorage.setItem('TOKEN', JSON.stringify(''));
      this.router.navigate(['/home', 'main'], { relativeTo: this.route });
    });
  }

}
