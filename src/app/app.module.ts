import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SignupComponent } from './components/signup/signup.component';
import { NgxUiLoaderModule,NgxUiLoaderConfig,SPINNER,PB_DIRECTION } from 'ngx-ui-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { SnackbarService } from './services/snackbar.service';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DashboardService } from './services/dashboard.service';
import { AuthService } from './services/auth.service';



const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text: 'Loading...',
  textColor: 'orange',
  textPosition: 'center-center',
  pbColor: 'orange',
  bgsColor: 'orange',
  fgsColor: 'orange',
  fgsType: SPINNER.rectangleBounce,
  fgsSize: 100,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    PageNotFoundComponent,
    SignupComponent,
    LoginComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    UserService, 
    SnackbarService,
    DashboardService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
