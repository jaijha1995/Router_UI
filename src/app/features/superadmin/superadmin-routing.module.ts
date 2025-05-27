import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : 'devices',
    loadChildren : () => import('./device/device.module').then(m => m.DeviceModule)
  },
  {
    path : 'command',
    loadChildren : () => import('./command/command.module').then(m => m.CommandModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminRoutingModule { }
