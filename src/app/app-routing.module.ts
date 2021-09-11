
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './auth/profile/profile.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './auth/auth.guard';
import { ResumeComponent } from './auth/resume/resume.component';
import { EditResumeComponent } from './auth/edit-resume/edit-resume.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path : 'resume', component : ResumeComponent},
  {path : 'edit-resume', component : EditResumeComponent},
  { path: 'profile',  component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
