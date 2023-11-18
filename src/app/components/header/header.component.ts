import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  menuType: String = "default";
  isLoggedIn = false;
  user: any;
  role: String = "member";
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem("token")) {
          // console.log("ulogovan");

          // this.menuType = "admin";
          const token = localStorage.getItem('token');
          if (token) {
            this.user = jwt_decode(token);
            this.role = this.user.UserRole;
            // console.log(this.menuType);
          }
          this.menuType = this.role;
          console.log(this.menuType);
        } else {
          this.menuType = "default";
        }
      }
    });
  }

  logout(){
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }
}
