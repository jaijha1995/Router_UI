import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view-data',
  imports: [],
  templateUrl: './view-data.component.html',
  styleUrl: './view-data.component.scss'
})
export class ViewDataComponent {
  detailsData:any
  constructor(
    private bsModalService: BsModalService
  ) { }

  ngOnInit() {
    console.log(this.detailsData);
    
  }

  close() {
    this.bsModalService.hide();
  }

}
