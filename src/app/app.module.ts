import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './auth/profile/profile.component';

import { AuthModule } from './auth/auth.module';
import { ResumeComponent } from './auth/resume/resume.component';
import { EditResumeComponent } from './auth/edit-resume/edit-resume.component';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Theme1Component } from './auth/theme1/theme1.component';
import { Theme2Component } from './auth/theme2/theme2.component';
import { Theme3Component } from './auth/theme3/theme3.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProfileComponent,
    ResumeComponent,
    EditResumeComponent,
    Theme1Component,
    Theme2Component,
    Theme3Component
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
