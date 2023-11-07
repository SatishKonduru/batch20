import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { globalProperties } from 'src/app/shared/globalProperties';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{
  constructor(
    private _formBuilder: FormBuilder,
    private _ngxService: NgxUiLoaderService,
    private _userService: UserService,
    private _dialogRef: MatDialogRef<ForgotPasswordComponent>,
    private _snackbar: SnackbarService
    ){}
public forgotPasswordForm : any = FormGroup
public responseMsg: any
ngOnInit(): void {
  this.forgotPasswordForm = this._formBuilder.group({
    email: [null, [Validators.required, Validators.pattern(globalProperties.emailRegx)]] 
  })
}
getPassword(){
  this._ngxService.start()
  var formData = this.forgotPasswordForm.value
  var data = {
    email: formData.email
  }
  this._userService.forgotPassword(data)
  .subscribe((res) => {
    this._ngxService.stop()
    this.responseMsg = res?.message
    this._dialogRef.close()
    this._snackbar.openSnackbar(this.responseMsg,'')
  }, (err) => {
    this._ngxService.stop()
    if(err.error?.message){
      this.responseMsg = err.error?.message
    }
    else{
      this.responseMsg = globalProperties.genericError
    }
    this._snackbar.openSnackbar(this.responseMsg,globalProperties.error)
  })

}




}
