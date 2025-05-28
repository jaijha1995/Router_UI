import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalService } from "ngx-bootstrap/modal";
import { DeviceService } from '../../services/device.service';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-create-device',
  imports: [ReactiveFormsModule],
  templateUrl: './create-device.component.html',
  styleUrl: './create-device.component.scss'
})
export class CreateDeviceComponent {
  @Output() mapdata = new EventEmitter();

  deviceForm!: FormGroup;
  constructor(
    private bsModalService: BsModalService,
    private fb: FormBuilder,
    private deviceService : DeviceService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.setInitialForm();
  }

  setInitialForm() {
    this.deviceForm = this.fb.group({
      name: ['',[Validators.required]],
      host: ['',[Validators.required]],
      port: ['',[Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  onSubmit(e:any, formvalue:any) {
    e.preventDefault();
    if (this.deviceForm.invalid) {
      this.deviceForm.markAllAsTouched();
      return;
    }

    let payload = {
        "id": 0,
         name : formvalue.name,
        "host": formvalue.host,
        "username": formvalue.username,
        "password": formvalue.password,
        "port": formvalue.port,
        "plaintext_login": true
    }

    this.deviceService.addDevice(payload).subscribe((res:any) => {
      console.log(res);
      if(res?.status == 200) {
        this.notificationService.showSuccess(res?.message);
        this.close();
        this.mapdata.emit();
      } else {
        this.notificationService.showError('Router is offline. Device could not be added.');
      }
    })
  }

  close() {
    this.bsModalService.hide();
  }
}
