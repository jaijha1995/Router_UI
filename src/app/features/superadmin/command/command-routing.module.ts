import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageCommandComponent } from './pages/manage-command/manage-command.component';
import { CommandDetailsComponent } from './components/command-details/command-details.component';

const routes: Routes = [
  {
    path : 'list', component : ManageCommandComponent
  },
  {
    path : 'command-details', component : CommandDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandRoutingModule { }
