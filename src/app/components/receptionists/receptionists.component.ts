import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-receptionists',
  templateUrl: './receptionists.component.html',
  styleUrls: ['./receptionists.component.css']
})
export class ReceptionistsComponent implements OnInit {
  receptionists: any[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchReceptionists();
  }

  fetchReceptionists(): void {

    this.adminService.getAllReceptionists().subscribe(
      (data) => {
        this.receptionists = data;
      },
      (error) => {
        console.error('Error fetching receptionists:', error);
      }
    );
  }
}
