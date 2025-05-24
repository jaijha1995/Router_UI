import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageDeviceComponent } from './pages/manage-device/manage-device.component';

const routes: Routes = [
  {
    path: '',
    component : ManageDeviceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRoutingModule { }
