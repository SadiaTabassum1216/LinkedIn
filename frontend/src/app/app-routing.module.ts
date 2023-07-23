import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { NotificationComponent } from './notification/notification.component';

const routes: Routes = [
  { path: '', component: SignupComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'home', component: HomeComponent },
  { path: 'notification', component: NotificationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
