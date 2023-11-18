import { Component, OnInit, NgZone  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { environment } from 'src/app/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { AdminService } from 'src/app/services/admin/admin.service';
import jwt_decode from 'jwt-decode';
import { ManagerService } from 'src/app/services/manager/manager.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trainers-by-manager',
  templateUrl: './trainers-by-manager.component.html',
  styleUrls: ['./trainers-by-manager.component.css']
})
export class TrainersByManagerComponent {
  trainers: any[] = [];
  pom: any;

  constructor(
    private managerService: ManagerService,
    private toastr: ToastrService)
  { }

 ngOnInit(): void {
   this.fetchTrainers();
 }

 fetchTrainers(): void {
   if (this.pom && this.pom.id) {
     const userId = this.pom.id;
     console.log('User ID:', userId);
   } else {
     console.log('User ID not found in token.');
   }
   const sieveModel = {
    filter: "",
    sort: "",
     page: "",
    pageSize: ""
   };

   this.managerService.getAllTrainers(sieveModel).subscribe(
    (data) => {
      this.trainers = data;
      this.trainers.forEach((trainer) => {
        this.managerService.getTrainerOccurrence(trainer.id).subscribe(
          (occurrenceCount) => {
            trainer.occurrenceCount = occurrenceCount;
          },
          (error) => {
            console.error('Error fetching occurrence count:', error);
          }
        );
      });
    },
    (error) => {
      console.error('Error fetching trainers:', error);
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
  const salaryAmount = trainer.anotherInput;

  console.log("Radi", salaryAmount);
  this.managerService.addTrainerSalary(trainerId, salaryAmount).subscribe(
    (response) => {
      this.toastr.success('Salary added successfully!', 'Success'); // Prikaži toastr obaveštenje

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
