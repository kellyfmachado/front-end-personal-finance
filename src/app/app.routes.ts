import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { HomeComponent } from './pages/index/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { TransactionComponent } from './pages/index/transaction/transaction.component';
import { CategoryComponent } from './pages/index/category/category.component';
import { UpdateAccountComponent } from './pages/index/update-account/update-account.component';
import { authGuard } from "./guards/auth.guard";

export const routes: Routes = [
  {path:'', redirectTo: '/login', pathMatch: 'full'},
  {path:'login', component: LoginComponent, pathMatch:'prefix'},
  {path:'register', component: RegisterComponent, pathMatch:'prefix'},
  {path:'home', component: HomeComponent, canActivate: [authGuard], pathMatch: 'full'},
  {path:'transaction', component: TransactionComponent, canActivate: [authGuard], pathMatch: 'full'},
  {path:'category', component: CategoryComponent, canActivate: [authGuard], pathMatch: 'full'},
  {path:'update', component: UpdateAccountComponent, canActivate: [authGuard], pathMatch: 'full'},
  { path: '**', redirectTo: '/login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutes {

}
