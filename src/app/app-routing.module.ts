import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { RouteGuardService } from './services/route-guard.service';
import { ManageCategoryComponent } from './components/manage-category/manage-category.component';
import { ManageProductComponent } from './components/manage-product/manage-product.component';
import { ManageOrderComponent } from './components/manage-order/manage-order.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home', //localhost:4200/home
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'rsk',
    
    children: [
      {
        path:'',
        redirectTo:'/rsk/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: 
        () => import('./modules/dashboard/dashboard.module')
        .then(m => m.DashboardModule),
        canActivate: [RouteGuardService],
        data: {
          expectedRole: ['admin','user']
        }
      },
      {
        path: 'category',
        component: ManageCategoryComponent,
        canActivate: [RouteGuardService],
        data: {
          expectedRole: ['admin']
        }
      },
      {
        path: 'product',
        component: ManageProductComponent,
        canActivate: [RouteGuardService],
        data: {
          expectedRole: ['admin']
        }
      },
      {
        path: 'order',
        component: ManageOrderComponent,
        canActivate: [RouteGuardService],
        data: {
          expectedRole: ['user','admin']
        }
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
