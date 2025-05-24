import { Component } from '@angular/core';
import { DeviceListComponent } from "../../component/device-list/device-list.component";

@Component({
  selector: 'app-manage-device',
  imports: [DeviceListComponent],
  templateUrl: './manage-device.component.html',
  styleUrl: './manage-device.component.scss'
})
export class ManageDeviceComponent {

}
