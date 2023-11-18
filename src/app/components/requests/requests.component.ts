
import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { OnInit } from '@angular/core';
import { ReceptionistService } from 'src/app/services/receptionist/receptionist.service';
@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  users: any[] = [];

  constructor(private receptionService: ReceptionistService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {

    this.receptionService.getAllRequests().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  onDeleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.receptionService.deleteRequest(userId).subscribe(
        (response) => {
          console.log('User deleted:', response);
          this.fetchUsers();
          // Refresh users list or update UI as needed
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

  onApproveUser(userId: number) {
    this.receptionService.approveRegistrationRequest(userId).subscribe(
      (response) => {
        console.log('User approved:', response);
        // Refresh users list or update UI as needed
      },
      (error) => {
        console.error('Error approving user:', error);
      }
    );
  }
}
