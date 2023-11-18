
import { Component, OnInit } from '@angular/core';
// import { PhoneFormatPipe } from '../phone-format.pipe';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-add-new-users',
  templateUrl: './add-new-users.component.html',
  styleUrls: ['./add-new-users.component.css']
})
export class AddNewUsersComponent implements OnInit{
  gender: string | undefined;
  phone = "2556522000";
  showSecureCodeField = false;
  registerForm!: FormGroup;
  success = false;
  errMessage = '';
  randomNumber = Math.floor(10000 + Math.random() * 90000);


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private adminService: AdminService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      role: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^06[0-9]{8}$')]],
      password: ['', Validators.required],
      repPassword: ['', [Validators.required, this.passwordMatchValidator]],
      // gender: ['', Validators.required],
      // secureCode: ['']

    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('userPassword')?.value;
    const repeatedPassword = control.get('repPassword')?.value;

    return password === repeatedPassword ? null : { passwordMismatch: true };
  };

  handleSubmit(): void {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      const role = formValue.role;

      if (role === 'admin') {
        this.adminService.addAdmin(formValue).subscribe(
          (response) => {
            // Handle success
            this.route.navigate(['/admin-dashboard']);
            console.log('Admin added:', response);
          },
          (error) => {
            // Handle error
            console.error('Error adding admin:', error);
          }
        );
      }
      else if (role === 'manager') {
        this.adminService.addManager(formValue).subscribe(
          (response) => {
            // Handle success
            this.route.navigate(['/managers']);
            console.log('Manager added:', response);
          },
          (error) => {
            // Handle error
            console.error('Error adding manager:', error);
          }
        );
      }
      else if (role === 'receptionist') {

        this.adminService.addReceptionist(formValue).subscribe(
          (response) => {
            // Handle success
            this.route.navigate(['/receptionists']);
            console.log('Receptionist added:', response);
          },
          (error) => {
            // Handle error
            console.error('Error adding receptionist:', error);
          }
        );
      }
    }
  }

  register() {
      this.registerUser();

  }

  registerUser() {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;

      if (user.secureCode == this.randomNumber) {
      // Enkodiranje lozinke
      const encodedPassword = btoa(user.userPassword);
      user.userPassword = encodedPassword;
      // user.phoneNumber = this.phoneFormatPipe.transform(user.phoneNumber);
      console.log(user);

      this.adminService.addAdmin(user).subscribe({
        next: () => {
          this.success = true;
        },
        error: (err) => {
          if (err.error.code) {
            this.errMessage = 'User already exists!! Try something else.';
          } else {
            this.errMessage = 'Something went wrong!!';
          }
        },
      });

      this.resetForm();
      this.route.navigate(['/login']);
    }
  } else {
      this.errMessage = this.getErrorMessage();
    }
  }

  resetForm() {
    this.registerForm.reset();
    this.errMessage = '';
  }

  getErrorMessage() : string {
    const formControls = this.registerForm.controls;

    if (formControls['firstName'].errors?.['required']) {
      return 'First Name is required.';
    } else if (formControls['lastName'].errors?.['required']) {
      return 'Last Name is required.';
    } else if (formControls['birthDate'].errors?.['required']) {
      return 'Birthday Date is required.';
    } else if (formControls['email'].errors?.['required']) {
      return 'Email is required.';
    } else if (formControls['email'].errors?.['pattern']) {
      return 'Invalid Email format.';
    } else if (formControls['phoneNumber'].errors?.['required']) {
      return 'Phone Number is required.';
    } else if (formControls['phoneNumber'].errors?.['pattern']) {
      return 'Invalid Phone Number format.';
    } else if (formControls['userName'].errors?.['required']) {
      return 'Username is required.';
    } else if (formControls['password'].errors?.['required']) {
      return 'Password is required.';
    } else if (formControls['repPassword'].errors?.['required']) {
      return 'Repeated Password is required.';
    } else if (formControls['repPassword'].errors?.['passwordMismatch']) {
      return 'Passwords do not match.';
    } else if (formControls['role'].errors?.['required']) {
      return 'User Role is required.';
    }

    return 'Fields are required.';

  }
}

