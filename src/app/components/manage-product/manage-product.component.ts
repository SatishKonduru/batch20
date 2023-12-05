import { DialogConfig } from '@angular/cdk/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { globalProperties } from 'src/app/shared/globalProperties';
import { ProductComponent } from '../product/product.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit{
displayedColumns : string[] = ['name','categoryName','description','price', 'edit']
dataSource: any;
responseMsg: any = ''
searchKey : string = ''


@ViewChild(MatPaginator) paginator: MatPaginator
constructor(
  private _productService: ProductService,
  private _ngxService: NgxUiLoaderService,
  private _userDialog : MatDialog,
  private _snackbar: SnackbarService,
  private _router: Router
){}


ngOnInit(): void {
  this._ngxService.start()
  this.tableData()
}

tableData(){
  this._productService.getProducts()
  .subscribe((res: any) => {
    this._ngxService.stop()
    this.dataSource = new MatTableDataSource(res)
    this.dataSource.paginator = this.paginator
  },(err:any) => {
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

addProduct(){
  const dailogConfig = new MatDialogConfig()
  dailogConfig.data = {action: 'Add'}
  dailogConfig.width = '300px'
  dailogConfig.disableClose = true
  dailogConfig.position = {top : '100', left: '48rem'}
  const dialogRef = this._userDialog.open(ProductComponent, dailogConfig)
  dialogRef.componentInstance.onAddProduct.subscribe((res: any) => {
    this.tableData()
  })

}

editProduct(item: any){
  const dialogConfig = new MatDialogConfig()
  dialogConfig.data = {
    action: 'Edit',
    data : item
  }
  dialogConfig.width = '300px'
  dialogConfig.disableClose = true
  dialogConfig.position = {top: '100px', left: '48rem'}
  const dialogRef = this._userDialog.open(ProductComponent, dialogConfig)
  this._router.events.subscribe(()=>{
    dialogRef.close()
  })
  dialogRef.componentInstance.onEditProduct.subscribe((res: any) => {
    this.tableData()
  })

}

onSearchClear(){
  this.searchKey = ''
  this.applyFilter('')
}

applyFilter(filterValue: string){
  this.dataSource.filter = filterValue.trim().toLowerCase()
}

deleteProduct(item : any){
  const dialogConfig = new MatDialogConfig()
  dialogConfig.data = {
    message: 'Delete: '+item.name+' product'
  }
  const dialogRef = this._userDialog.open(ConfirmationComponent, dialogConfig)

  dialogRef.componentInstance.omEmitStatusChange.subscribe(res => {
    this._ngxService.start()
    this.delete(item.id)
    dialogRef.close()
  })

}

delete(id: any){
  console.log("Deleting Item Id: ", id)
  this._productService.delete(id)
  .subscribe((res: any) => {
    this._ngxService.stop()
    this.tableData()
    this.responseMsg = res.message
    this._snackbar.openSnackbar(this.responseMsg, 'Success')
  },(err: any) => {
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

onChange(status: any, id: any){
  var data = {
    status: status.toSting(),
    id: id
  }
  this._productService.updateStatus(data)
  .subscribe((res: any) => {
    this._ngxService.stop()
    this.responseMsg = res.message
    this._snackbar.openSnackbar(this.responseMsg, 'Success')
  }, (err: any) => {
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
