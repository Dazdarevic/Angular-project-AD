 import { Component, OnInit, NgZone  } from '@angular/core';
 import { HttpClient } from '@angular/common/http';
 import { NgForm, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
 import { environment } from 'src/app/environments/environment';
 import { HttpHeaders } from '@angular/common/http';
 import { AdminService } from 'src/app/services/admin/admin.service';
 import jwt_decode from 'jwt-decode';

 @Component({
   selector: 'app-admin-dashboard',
   templateUrl: './admin-dashboard.component.html',
 styleUrls: ['./admin-dashboard.component.css']
 })
export class AdminDashboardComponent implements OnInit {
   admins: any[] = [];
   pom: any;
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchAdmins();
  }

  fetchAdmins(): void {
    if (this.pom && this.pom.id) {
      const userId = this.pom.id;
      console.log('User ID:', userId);
    } else {
      console.log('User ID not found in token.');
    }

    this.adminService.getAllAdmins().subscribe(
      (data) => {
        this.admins = data;
      },
      (error) => {
        console.error('Error fetching managers:', error);
      }
    );
  }

}
