import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { saveAs } from 'file-saver';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BillService } from 'src/app/services/bill.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { globalProperties } from 'src/app/shared/globalProperties';


@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent implements OnInit{
displayedColumns: string [] = ['name', 'category', 'price', 'quantity', 'total','edit']

dataSource: any = []
manageOrderForm :any = FormGroup
categories: any = []
products: any = []
price: any;
totalAmount: number = 0
length: any;
responseMsg : any = ''

@ViewChild(MatPaginator) paginator: MatPaginator
constructor(
  private _formBuilder: FormBuilder,
  private _categoryService: CategoryService,
  private _productService: ProductService,
  private _ngxService: NgxUiLoaderService,
  private _snackbar: SnackbarService,
  private _billService: BillService
){}

ngOnInit(): void {
  this._ngxService.start()
  this.getCategories()
  this.manageOrderForm = this._formBuilder.group({
    name: [null,[Validators.required]],
    email: [null,, [Validators.required, Validators.pattern(globalProperties.emailRegx)]],
    contactNumber: [null, [Validators.required, Validators.pattern(globalProperties.contactNumberRegex)]],
    paymentMethod: [null, [Validators.required]],
    product: [null, [Validators.required]],
    category: [null, [Validators.required]],
    quantity: [null, [Validators.required]],
    price: [null, [Validators.required]],
    total: [0, [Validators.required]]
  })
}
getCategories(){
this._categoryService.getCategories()
.subscribe((res: any) => {
  this._ngxService.stop()
  this.categories = res
}, (err: any) => {
  this._ngxService.stop()
  if(err.error?.message){
    this.responseMsg = err.error?.message
  }
  else{
    this.responseMsg = globalProperties.genericError
  }
  this._snackbar.openSnackbar(this.responseMsg, globalProperties.error)
})
}


getProductByCategory(item: any){
  this._productService.getProductByCategory(item.id)
  .subscribe((res: any) => {
    this.products = res
    this.manageOrderForm.contols['price'].setValue('')
    this.manageOrderForm.controls['quantity'].setValue('')
    this.manageOrderForm.controls['total'].setValue(0)
  }, (err: any) => {
   this._ngxService.stop()
  if(err.error?.message){
    this.responseMsg = err.error?.message
  }
  else{
    this.responseMsg = globalProperties.genericError
  }
  this._snackbar.openSnackbar(this.responseMsg, globalProperties.error)
  })


}

getProductDetails(item: any){
this._productService.getById(item.id)
.subscribe((res: any) => {
  this.price = res.price
  this.manageOrderForm.controls['price'].setValue(this.price)
  this.manageOrderForm.controls['quantity'].setValue(1)
  this.manageOrderForm.controls['total'].setValue(this.price * 1)

}, (err: any)=>{
  this._ngxService.stop()
  if(err.error?.message){
    this.responseMsg = err.error?.message
  }
  else{
    this.responseMsg = globalProperties.genericError
  }
  this._snackbar.openSnackbar(this.responseMsg, globalProperties.error)

})
}

setQuantity(value: any){
  var temp = this.manageOrderForm.controls['quantity'].value
  if(temp > 0){
    this.manageOrderForm.controls['total'].setValue(
      this.manageOrderForm.controls['quantity'].value * this.manageOrderForm.controls['price'].value
    )
  }
  else if(temp != ''){
    this.manageOrderForm.controls['quantity'].setValue(1)
    this.manageOrderForm.controls['total'].setValue(
      this.manageOrderForm.controls['quantity'].value * this.manageOrderForm.controls['price'].value
    )
  }
  else{
    this.manageOrderForm.controls['quantity'].setValue(1)
    this.manageOrderForm.controls['total'].setValue(
      this.manageOrderForm.controls['quantity'].value * this.manageOrderForm.controls['price'].value
    )
  }
}





}
