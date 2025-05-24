import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  /**
   * show success toastr
   * @param message 
   */
  showSuccess(message: string) {
    this.toastr.success(message);
  }

  /**
   * show eroor toastr
   * @param message 
   */
  showError(message: string) {
    this.toastr.error(message);
  }


  /**
   * show information toastr
   * @param message 
   */
  showInfo(message: string) {
    this.toastr.info(message);
  }


  /**
   * show warning tastr
   * @param message 
   */
  showWarning(message: string) {
    this.toastr.warning(message);
  }

  successAlert(message:any){
    Swal.fire({
      position: "center",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 2000
    });
  }

  errorAlert(message: any): void {
    Swal.fire({
      position: "center",
      icon: "error", 
      title: message,
      showConfirmButton: false,
      timer: 2000
    });
}


  deleteAlert(): Promise<any> {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });

   return swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    })
  }
}
