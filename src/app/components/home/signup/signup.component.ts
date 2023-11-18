import { Component } from '@angular/core';
// import { PhoneFormatPipe } from '../phone-format.pipe';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { SignupService } from 'src/app/services/signup/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
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
    private signupService: SignupService,
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

      this.signupService.createRegistrationRequest(formValue).subscribe(
        (response) => {
          if (response.message === 'Registration request created successfully.') {
            // Handle success
            // this.route.navigate(['/login']);
            console.log('User added:', response);
          } else {
            // Handle unexpected response
            console.error('Unexpected response:', response);
          }
        },
        (error) => {
          // Handle error
          console.error('Error adding admin:', error);
        }
      );

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


