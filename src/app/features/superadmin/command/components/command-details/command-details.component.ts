import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from '../../../../shared/pipe/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivatedRoute } from '@angular/router';
import { CommandService } from '../../services/command.service';
import { UpdateCommandDetailsComponent } from '../update-command-details/update-command-details.component';

@Component({
  selector: 'app-command-details',
  imports: [LoaderComponent, FormsModule, SearchFilterPipe, NgxPaginationModule],
  templateUrl: './command-details.component.html',
  styleUrl: './command-details.component.scss'
})
export class CommandDetailsComponent {
  isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  columns: any;
  commandList: any
  searchKeyword: any;
  bsModalRef!: BsModalRef
  commandId: any;
  deviceId: any;
  commandDetailsId:any;
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  };

  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  };

  constructor(
    private route: ActivatedRoute,
    private commandService: CommandService,
    private modalService: BsModalService
  ) {
    this.route.queryParams.subscribe(params => {
      this.deviceId = params['deviceId'];
      this.commandId = params['commandId'];
      this.getCommandDetails();
    });
  }

  ngOnInit() {
  }

  setInitialTable() {
    this.columns = [];
  }

  getCommandDetails() {
    this.isLoading = true;
  
    const payload = {
      device_id: this.deviceId && Number(this.deviceId),
      command_id: this.commandId && Number(this.commandId)
    };
  
    this.commandService.commandDetails(payload).subscribe((res: any) => {
      this.isLoading = false;
      const commandData = res?.body?.data?.response || [];  
      this.commandDetailsId = res?.body?.data?.id;
      this.pagesize.count = commandData.length;
  
      if (commandData.length > 0) {
        this.columns = Object.keys(commandData[0]).map(key => ({
          key,
          title: key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        }));
        this.columns.push({ key: 'update', title: 'Action' });
  
        this.commandList = commandData;
      } else {
        this.commandList = [];
      }
    });
  }
  

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
    this.pagesize.offset = 1;
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
  }

  onSearch(event: any) {
    const searchValue = event.target.value.trim().replace(/\s+/g, ' ');
    this.searchKeyword = searchValue;
    this.commandList = [];
    this.pagesize.offset = 1;
    this.pagesize.limit = 25;
  }

  clearSearch() {
    this.searchKeyword = '';
    this.pagesize.offset = 1;
    this.pagesize.limit = 25;
  }

  onUpdateCommand(value:any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : '',
        deviceId : this.commandDetailsId
      },
    };
    this.bsModalRef = this.modalService.show(
      UpdateCommandDetailsComponent,
      Object.assign(initialState, {
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getCommandDetails()
    });
  }
}
