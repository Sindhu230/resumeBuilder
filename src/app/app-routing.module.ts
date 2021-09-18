
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './auth/profile/profile.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './auth/auth.guard';
import { ResumeComponent } from './auth/resume/resume.component';
import { EditResumeComponent } from './auth/edit-resume/edit-resume.component';
import{Theme1Component} from './auth/theme1/theme1.component'
import { Theme2Component } from './auth/theme2/theme2.component';
import { Theme3Component } from './auth/theme3/theme3.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path : 'resume', component : ResumeComponent},
  {path : 'edit-resume', component : EditResumeComponent},
  { path: 'profile',  component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'theme1',  component: Theme1Component },
  { path: 'theme2',  component: Theme2Component },
  { path: 'theme3',  component: Theme3Component }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
