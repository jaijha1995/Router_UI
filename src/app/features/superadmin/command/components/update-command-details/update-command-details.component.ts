import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommandService } from '../../services/command.service';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-update-command-details',
  imports: [ReactiveFormsModule],
  templateUrl: './update-command-details.component.html',
  styleUrl: './update-command-details.component.scss'
})
export class UpdateCommandDetailsComponent {
  @Output() mapdata = new EventEmitter();
  label :string = 'Add';
  commandForm!: FormGroup;
  deviceId:any
  editData : any;
  deviceType  = [
    {
      name: 'Yes',
      value: "true"
    },
    {
      name: 'No',
      value: "false"
    },
  ]
  payload: any;

  constructor(
    private bsModalService: BsModalService,
    private fb : FormBuilder,
    private commandService : CommandService,
    private notificationService : NotificationService
  ) {};

  ngOnInit() {        
    this.setInitialForm();
  }

  setInitialForm() {
    this.commandForm = this.fb.group({
      commandType: [null,[Validators.required]],
    });
    if(this.editData) {
      this.commandForm.patchValue({
        commandType : this.editData?.disabled
      })

      this.payload = this.editData
    }
  }

  submit(e:any, formvalue:any) {
    e.preventDefault();
   if (this.commandForm.invalid) {
      this.commandForm.markAllAsTouched();
      return;
    }

    this.payload['disabled'] = formvalue.commandType;
    
    let payload = {
      "response_id": this.editData?.id,
      "data": this.payload
    }
    this.commandService.updateCommandDetails(payload, this.deviceId).subscribe((res:any) => {
      if (res?.status === 200) {
        this.notificationService.showSuccess(res?.body?.message)
        this.bsModalService.hide();
        this.mapdata.emit();
      } else {
        this.notificationService.showError(res?.body?.message)
      }
      
    })
    
  }

  close() {
    this.bsModalService.hide();
  }
}
