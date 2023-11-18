
import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {
  managers: any[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchManagers();
  }

  fetchManagers(): void {

    this.adminService.getAllManagers().subscribe(
      (data) => {
        this.managers = data;
      },
      (error) => {
        console.error('Error fetching managers:', error);
      }
    );
  }
}

