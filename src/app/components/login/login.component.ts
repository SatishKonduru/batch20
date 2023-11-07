import { DialogConfig } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { globalProperties } from 'src/app/shared/globalProperties';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
constructor(private _formBuilder: FormBuilder,
  private _ngxService: NgxUiLoaderService,
  private _userService: UserService,
  private _dialogRef: MatDialogRef<LoginComponent>,
  private _snackbar: SnackbarService,
  private _router: Router, 
  private _userDialog: MatDialog){}

  loginForm : any = FormGroup;
  public responseMsg : any;

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(globalProperties.emailRegx)]],
      password: [null, [Validators.required]]
    })
  }

  forgotPassword(){
    this._dialogRef.close()
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width='70rem'
    dialogConfig.position = {top:'5px', right: '10px'}
    dialogConfig.disableClose = true
    this._userDialog.open(ForgotPasswordComponent, dialogConfig)
  }

}
