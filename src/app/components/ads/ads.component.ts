import { Component, OnInit } from '@angular/core';
import { SellerService } from 'src/app/services/seller/seller.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { SponsorService } from 'src/app/services/sponsor/sponsor.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PhotoService } from 'src/app/services/photo/photo.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  products: any[] = [];
  newProduct: any = {
    name: '',
    type: '',
    price: '',
    url: '',
    isMain: true,
    publicId: '',
    sellerId: 1 //
  };
  addForm!: FormGroup;
  selectedFile!: any;

  constructor(
    private photoService: PhotoService,
    private sponsorService: SponsorService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.fetchProducts();
    this.addForm = this.formBuilder.group({
      title: ['', Validators.required],
      url: [''],
      isMain: [false],
      publicId: [''],
      sponsorId: [''],
    });
  }

  fetchProducts(): void {
    this.sponsorService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  handleSubmit(): void {
    console.log("radi");
    if (this.addForm.valid) {
      const formValue = this.addForm.value;
      formValue.sponsorId = 1;
      formValue.url = this.selectedFile;
      formValue.isMain = false;
      formValue.publicId = 'hej';

      console.log(formValue);
      this.sponsorService.addProduct(formValue).subscribe(
        (response) => {
          // Handle success
          console.log(' added:', response);
          // this.addForm.reset();
        },
        (error) => {
          // Handle error
          console.error('Error adding:', error);

          if (error instanceof HttpErrorResponse) {
            console.log('Status:', error.status);
            console.log('Status Text:', error.statusText);
            console.log('URL:', error.url);
            console.log('Error Details:', error.error);
          }
        }

      );
    }
  }


  getFile(event: any) {
    const file: File = event.target.files[0];
    console.log("file" + file);
    this.uploadPhoto(file);
  }


  uploadPhoto(file: File) {
    this.photoService.sendPhoto(file).subscribe(
      (response) => {
        this.selectedFile = response.url;
        // console.log("slika2", this.selectedFile);
        // console.log("Photo uploaded successfuly", response.url);
      },
      (error) => {
        console.log("Error " + error);
      }
    );
  }
}

