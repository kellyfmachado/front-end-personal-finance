import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { HomeComponent } from './pages/index/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { TransactionComponent } from './pages/index/transaction/transaction.component';
import { CategoryComponent } from './pages/index/category/category.component';

export const routes: Routes = [
  {path:'', component: HomeComponent, pathMatch: 'full'},
  {path:'login', component: LoginComponent, pathMatch:'prefix'},
  {path:'register', component: RegisterComponent, pathMatch:'prefix'},
  {path:'transaction', component: TransactionComponent, pathMatch: 'full'},
  {path:'category', component: CategoryComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutes {

}
