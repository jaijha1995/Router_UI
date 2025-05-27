import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-delete-confirmation',
  imports: [],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.scss'
})
export class DeleteConfirmationComponent {
  title: any;
  content: any;
  primaryActionLabel: any;
  secondaryActionLabel: any;
  service: any
  @Output() mapdata = new EventEmitter<string>();

  constructor(
    private bsmodalservice: BsModalService
  ) {    
   }

  ok() {
    this.service.subscribe((res:any) => {
      this.mapdata.emit(res)
    })
    this.bsmodalservice.hide()
  }

  cancel() {
    this.bsmodalservice.hide()
  }
}