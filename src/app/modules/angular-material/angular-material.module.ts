import { NgModule } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';



const materialComponents = [
  MatSidenavModule,
  MatIconModule,
  MatMenuModule,
  MatDialogModule,
  MatToolbarModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatSnackBarModule
]
@NgModule({
 imports: [materialComponents],
 exports: [materialComponents]
})
export class AngularMaterialModule { }
