import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { LoginServiceService } from 'src/app/services/login/login-service.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  role: any;
  loginForm!: FormGroup;
  message = '';

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userEmail: ['',Validators.required],
      userPassword: ['',Validators.required],
    })
  }

  login() {
    console.log("login() funkcija pozvana."); //

    if (this.loginForm.valid) {
      console.log("Forma je validna."); //

      const formValue = this.loginForm.value;
      console.log("User Email: " + formValue.userEmail + " User Password: " + formValue.userPassword);

      //const encodedPassword = btoa(formValue.userPassword);
      //formValue.userPassword = encodedPassword;
      //console.log("Enkodirana lozinka: " + encodedPassword);
      const user = {
        Email: formValue.userEmail,
        Password: formValue.userPassword,
        AccessToken: '',
        RefreshToken: ''
      };

      this.loginService.login(user).subscribe({
        next: (res) => {
          console.log("Odgovor sa servera: ", res); //
          const accessToken = res.value.value.accessToken;

          localStorage.setItem('token', accessToken);
          //console.log("Radii", accessToken);

          const token = localStorage.getItem('token');
          if (token) {
            this.role = jwt_decode(token);
            console.log("Uloga", this.role);
            this.role = res.value.value.role;
          }
          console.log("ULOGA: " + this.role);

          if (this.role == "admin") {
            this.router.navigate(['/admin-dashboard']);
          }
          if (this.role == "manager") {
            this.router.navigate(['/trainers']);
          }
          if (this.role == "seller") {
            this.router.navigate(['/products']);
          }
          if (this.role == "sponsor") {
            this.router.navigate(['/ads']);
          }
          if (this.role == "receptionist") {
            this.router.navigate(['/requests']);
          }
          if (this.role == "member") {
            this.router.navigate(['/show-trainers']);
          }
          else {
            // this.router.navigate(['/login']);
          }

        }, error: (err) => {
          this.message = 'Invalid username or password.';
          console.log("Greška sa servera: ", err);
        }
      })
    } else {
      this.message = 'Invalid Email or Password.';
      console.log("Forma nije validna.");
    }
  }

}
