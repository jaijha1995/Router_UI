import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from '../../../../shared/pipe/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivatedRoute } from '@angular/router';
import { CommandService } from '../../services/command.service';

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
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  };

  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  };

  constructor(
    private route: ActivatedRoute,
    private commandService: CommandService
  ) {
    this.route.queryParams.subscribe(params => {
      this.deviceId = params['deviceId'];
      this.commandId = params['commandId'];
      this.getCommandDetails();
    });
  }

  ngOnInit() {
    this.setInitialTable();
  }

  setInitialTable() {
    this.columns = [
      { key: 'id', title: 'ID' },
      { key: 'name', title: 'Name' },
      { key: 'default-name', title: 'Default Name' },
      { key: 'type', title: 'Type' },
      { key: 'mtu', title: 'MTU' },
      { key: 'actual-mtu', title: 'Actual MTU' },
      { key: 'mac-address', title: 'MAC Address' },
      { key: 'last-link-up-time', title: 'Last Link Up Time' },
      { key: 'rx-byte', title: 'RX Bytes' },
      { key: 'tx-byte', title: 'TX Bytes' },
      { key: 'rx-packet', title: 'RX Packets' },
      { key: 'tx-packet', title: 'TX Packets' },
      { key: 'running', title: 'Status' },
      { key: 'disabled', title: 'Disabled' },
      {key : '', title : 'Action'},
    ]
  }

  getCommandDetails() {
    this.isLoading = true;
    let payload = {
      "device_id": this.deviceId && Number(this.deviceId),
      "command_id": this.commandId && Number(this.commandId)
    }
    this.commandService.commandDetails(payload).subscribe((res: any) => {
      this.isLoading = false;
      this.commandList = res?.body?.data?.response || [];
      this.pagesize.count = this.commandList?.length;
    })
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

  }
}
