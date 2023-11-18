import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/home/login/login.component';
import { SignupComponent } from './components/home/signup/signup.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ReceptionistsComponent } from './components/receptionists/receptionists.component';
import { ManagersComponent } from './components/managers/managers.component';
import { AddNewUsersComponent } from './components/add-new-users/add-new-users.component';
import { TrainersByManagerComponent } from './components/trainers-by-manager/trainers-by-manager.component';
import { MembersComponent } from './components/members/members.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ProductsComponent } from './components/products/products.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AdsComponent } from './components/ads/ads.component';
import { RequestsComponent } from './components/requests/requests.component';
import { ShowTrainersComponent } from './components/show-trainers/show-trainers.component';
import { IgcFormsModule } from 'igniteui-angular';
import { AllAdsComponent } from './components/all-ads/all-ads.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { MyMemberComponent } from './components/my-member/my-member.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    AdminDashboardComponent,
    ReceptionistsComponent,
    ManagersComponent,
    AddNewUsersComponent,
    TrainersByManagerComponent,
    MembersComponent,
    ProductsComponent,
    AddProductComponent,
    AdsComponent,
    RequestsComponent,
    ShowTrainersComponent,
    AllAdsComponent,
    AllProductsComponent,
    MyMemberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    IgcFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
