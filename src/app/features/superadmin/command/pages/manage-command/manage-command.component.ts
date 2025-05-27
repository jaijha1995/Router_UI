import { Component } from '@angular/core';
import { CommandListComponent } from "../../components/command-list/command-list.component";

@Component({
  selector: 'app-manage-command',
  imports: [CommandListComponent],
  templateUrl: './manage-command.component.html',
  styleUrl: './manage-command.component.scss'
})
export class ManageCommandComponent {

}
