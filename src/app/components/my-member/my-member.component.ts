import { Component } from '@angular/core';
import { ManagerService } from 'src/app/services/manager/manager.service';

@Component({
  selector: 'my-member',
  templateUrl: './my-member.component.html',
  styleUrls: ['./my-member.component.css']
})
export class MyMemberComponent {

  members: any[] = [];

  constructor(private managerService: ManagerService) { }

  ngOnInit(): void {
    this.fetchMembers();
  }

  fetchMembers(): void {
    this.managerService.getAllMembers().subscribe(
      (data) => {
        this.members = data;
      },
      (error) => {
        console.error('Error fetching members:', error);
      }
    );
  }

  toggleInput(trainer: any): void {
    trainer.showInput = true;
    trainer.showPriceInput = !trainer.showPriceInput;
   trainer.membershipPrice = ''; // Resetuj vrednost input polja
 }

   cancelInput(trainer: any): void {
   trainer.showPriceInput = !trainer.showPriceInput;
   trainer.showInput = false;
 }

 submitMembershipPrice(trainer: any): void {
   const trainerId = trainer.id;
   const membershipAmount = trainer.anotherInput;

   console.log("Radi", membershipAmount);
   this.managerService.addMembership(trainerId, membershipAmount).subscribe(
     (response) => {

       // console.log('Salary added successfully:', response);
     },
     (error) => {
       // console.error('Error adding salary:', error);

       // if (error.error instanceof ErrorEvent) {
       //   // Greška na klijentskoj strani
       //   console.error('Client-side error:', error.error.message);
       // } else {
       //   // Greška na serverskoj strani
       //   console.error('Server-side error:', error.status, error.statusText, error.error);
       // }
     }
   );

   trainer.showInput = false;
   trainer.showPriceInput = !trainer.showPriceInput;
 }

}
