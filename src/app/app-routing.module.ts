import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { RouteGuardService } from './services/route-guard.service';

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
    component: DashboardComponent,
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
