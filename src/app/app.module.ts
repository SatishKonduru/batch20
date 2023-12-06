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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SnackbarService } from './services/snackbar.service';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DashboardService } from './services/dashboard.service';
import { AuthService } from './services/auth.service';
import { RouteGuardService } from './services/route-guard.service';
import { TokenInterceptorInterceptor } from './services/token-interceptor.interceptor';
import { MenuItems } from './shared/menu-items';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LogoutComponent } from './components/logout/logout.component';
import { CategoryService } from './services/category.service';
import { ManageCategoryComponent } from './components/manage-category/manage-category.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductService } from './services/product.service';
import { ManageProductComponent } from './components/manage-product/manage-product.component';
import { ProductComponent } from './components/product/product.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { BillService } from './services/bill.service';
import { ManageOrderComponent } from './components/manage-order/manage-order.component';



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
    ForgotPasswordComponent,
    ChangePasswordComponent,
    LogoutComponent,
    ManageCategoryComponent,
    CategoryComponent,
    ManageProductComponent,
    ProductComponent,
    ConfirmationComponent,
    ManageOrderComponent
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
    AuthService,
    RouteGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorInterceptor,
      multi: true
    },
    MenuItems,
    CategoryService,
    ProductService,
    BillService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
