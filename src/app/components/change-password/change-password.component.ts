import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { globalProperties } from 'src/app/shared/globalProperties';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{

  changePasswordForm : any = FormGroup
  responseMsg: any = ''
  constructor(
    private _formBuilder:  FormBuilder,
    private _userService: UserService,
    private _dialogRef: MatDialogRef<ChangePasswordComponent>,
    private _ngxLoader:  NgxUiLoaderService,
    private _snackbar: SnackbarService
  ){}

ngOnInit(): void {
  this.changePasswordForm = this._formBuilder.group({
    email: [null, [Validators.required, Validators.pattern(globalProperties.emailRegx)]],
    oldPassword: [null, [Validators.required]],
    newPassword: [null, Validators.required],
    confirmPassword: [null, Validators.required]
  })
}






}
