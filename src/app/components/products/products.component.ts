import { Component, OnInit } from '@angular/core';
import { SellerService } from 'src/app/services/seller/seller.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { PhotoService } from 'src/app/services/photo/photo.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
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
  selectedFile: File | null = null;

  constructor(
    private sellerService: SellerService,
    private formBuilder: FormBuilder,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    this.fetchProducts();
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
      url: [''],
      isMain: [false],
      publicId: [''],
      sellerId: [''],
    });
  }

  fetchProducts(): void {
    this.sellerService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        // console.error('Error fetching products:', error);
      }
    );
  }
  handleSubmit(): void {
    if (this.addForm.valid) {
      const formValue = this.addForm.value;
      formValue.sellerId = 1;
      formValue.url = this.selectedFile;
      formValue.isMain = false;
      formValue.publicId = 'publicId';

      this.sellerService.addProduct(formValue).subscribe(
        (response) => {
          // Handle success
          console.log(' added:', response);
          this.addForm.reset();
          this.fetchProducts();
          // this.addForm.reset();
        },
        (error) => {
          // Handle error
          console.error('Error adding:', error);
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
        console.log("slika2", this.selectedFile);
        // console.log("Photo uploaded successfuly", response.url);
      },
      (error) => {
        console.log("Error " + error);
      }
    );
  }
}
