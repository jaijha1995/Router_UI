import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchFilterPipe } from '../../../../shared/pipe/search.pipe';
import { DatePipe, DecimalPipe } from '@angular/common';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-view-cpu-data',
  imports: [ NgxPaginationModule , DatePipe , DecimalPipe],
  templateUrl: './view-cpu-data.component.html',
  styleUrl: './view-cpu-data.component.scss'
})
export class ViewCpuDataComponent {
  isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  columns: any;
  data :any
  searchKeyword: any;
  bsModalRef! : BsModalRef
  deviceId: any;
  detailsData :any
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  };

  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  };
  constructor(
    private bsModalService : BsModalService,
    private DeviceService : DeviceService
  ) { };

  ngOnInit() {
    this.setInitialTable();
    this.getCpuList()
  }

  getCpuList() {
    this.isLoading = true;
    this.DeviceService.cpuListData(this.detailsData?.id).subscribe((res: any) => {
      this.isLoading = false;      
      this.data = res?.body?.data;
    })
  }

  setInitialTable() {
    this.columns = [
      {key: '', title : 'Id'},
      {key: '', title : 'Version'},
      {key: '', title : 'CPU Load'},
      {key : '', title : 'Free Memory'},
      {key : '', title : 'Total Memory'},
      {key : '', title : 'Free Disk Space'},
      {key : '', title : 'Total Disk Space'},
      {key : '', title : 'Uptime'},
      {key : '', title : 'Timestamp'},
    ]
  }

  close(){
    this.bsModalService.hide()
  }
}
