import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';

export const routes: Routes = [
  {path:'', component: LoginComponent, pathMatch: 'full' },
  {path:'register', component: RegisterComponent, pathMatch:'prefix'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutes {

}
