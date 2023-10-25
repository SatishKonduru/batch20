import { NgModule } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';



const materialComponents = [
  MatSidenavModule,
  MatIconModule
]
@NgModule({
 imports: [materialComponents],
 exports: [materialComponents]
})
export class AngularMaterialModule { }
