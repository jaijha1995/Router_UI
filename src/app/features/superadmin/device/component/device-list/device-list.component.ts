import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DeviceService } from '../../services/device.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateDeviceComponent } from '../create-device/create-device.component';
import { SearchFilterPipe } from '../../../../shared/pipe/search.pipe';
import { ViewDataComponent } from '../view-data/view-data.component';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-list',
  imports: [NgxPaginationModule, FormsModule, SearchFilterPipe, LoaderComponent],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.scss'
})
export class DeviceListComponent {
  spinnerLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  public columns!: any;
  deviceList:any;
  searchKeyword:any;
  commondList:any = [
    {id: 'print', value : 'Print'},
    {id: 'nat', value : 'Nat'},
    {id: 'vlan', value : 'V lan'}
  ];
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }

  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  constructor(
    private deviceService: DeviceService,
    private modalService: BsModalService,
    private router : Router
  ) {

  }

  ngOnInit(): void {
    this.getDeviceList();
  }

  getDeviceList() {
    this.spinnerLoading = true;
    this.deviceService.deviceListData().subscribe((res: any) => {      
      this.spinnerLoading = false;
      this.deviceList = res?.body.data || [];
      this.pagesize.count = this.deviceList?.length || 0;
    })
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
  }

  bsModalRef!: BsModalRef
  onAddDevice(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateDeviceComponent,
      Object.assign(initialState, {
        id: "confirmation",
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );

    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getDeviceList();
    });
  }

  clearSearch() {
    this.searchKeyword = '';
    this.getDeviceList();
  }

  onViewData(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        detailsData: value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      ViewDataComponent,
      Object.assign(initialState, {
        id: "confirmation",
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );
  }

  onGoToLive(value :any) {
    this.router.navigate(['/superadmin/command/list'], { queryParams: { deviceId: value?.id } });
  }
}
