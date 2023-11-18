import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/home/login/login.component';
import { SignupComponent } from './components/home/signup/signup.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ReceptionistsComponent } from './components/receptionists/receptionists.component';
import { ManagersComponent } from './components/managers/managers.component';
import { AddNewUsersComponent } from './components/add-new-users/add-new-users.component';
import { TrainersByManagerComponent } from './components/trainers-by-manager/trainers-by-manager.component';
import { MembersComponent } from './components/members/members.component';
import { ProductsComponent } from './components/products/products.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AdsComponent } from './components/ads/ads.component';
import { RequestsComponent } from './components/requests/requests.component';
import { ShowTrainersComponent } from './components/show-trainers/show-trainers.component';
import { AllAdsComponent } from './components/all-ads/all-ads.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { MyMemberComponent } from './components/my-member/my-member.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent },
  {path: 'signup', component: SignupComponent },
  {path: 'admin-dashboard', component: AdminDashboardComponent},
  {path: 'receptionists', component: ReceptionistsComponent },
  {path: 'managers', component: ManagersComponent},
  {path: 'newUser', component: AddNewUsersComponent},
  {path: 'trainers', component: TrainersByManagerComponent},
  {path: 'members', component: MembersComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'add-product', component: AddProductComponent},
  {path: 'ads', component: AdsComponent},
  {path: 'requests', component: RequestsComponent},
  {path: 'show-trainers', component: ShowTrainersComponent},
  {path: 'all-ads', component: AllAdsComponent},
  {path: 'all-products', component: AllProductsComponent},
  {path: 'my-member', component: MyMemberComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
