import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { globalProperties } from 'src/app/shared/globalProperties';

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
  private _router: Router){}

  loginForm : any = FormGroup;
  public responseMsg : any;

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(globalProperties.emailRegx)]],
      password: [null, [Validators.required]]
    })
  }

  forgotPassword(){

  }

}
