import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommandService } from '../../services/command.service';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-create-command',
  imports: [ReactiveFormsModule],
  templateUrl: './create-command.component.html',
  styleUrl: './create-command.component.scss'
})
export class CreateCommandComponent {
  @Output() mapdata = new EventEmitter();
  label :string = 'Add';
  commandForm!: FormGroup;
  editData : any;

  constructor(
    private bsmodalService : BsModalService,
    private fb : FormBuilder,
    private commandService : CommandService,
    private NotificationService : NotificationService
  ) {};

  ngOnInit() {
    this.setInitialForm();
  }

  setInitialForm() {
    this.commandForm = this.fb.group({
      commandName: [''],
      command: ['',[Validators.required]]
    });

    if(this.editData) {
      this.label = 'Update';
      this.commandForm.patchValue({
        commandName : this.editData?.name,
        command : this.editData?.command
      })
    }
  }

  submit(e:any, formvalue:any) {
    e.preventDefault();
    if (this.commandForm.invalid) {
      this.commandForm.markAllAsTouched();
      return;
    }
    let payload:any = {
      name : formvalue.commandName,
      command : formvalue.command
    };
    let service = this.commandService.addCommand(payload);
    if(this.editData) {
      payload['id'] = this.editData?.id;
      service = this.commandService.updateCommand(payload);
    }
    service.subscribe((res:any) => {      
      if (res?.status === 201) {
        this.NotificationService.showSuccess(res?.body?.message)
        this.bsmodalService.hide();
        this.mapdata.emit();
      } else {
        this.NotificationService.showError(res?.body?.message)
      }
    })
  }

  close() {
    this.bsmodalService.hide();
  }
}
