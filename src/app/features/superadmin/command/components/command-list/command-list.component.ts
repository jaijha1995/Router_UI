import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { SearchFilterPipe } from '../../../../shared/pipe/search.pipe';
import { CommandService } from '../../services/command.service';
import { CreateCommandComponent } from '../create-command/create-command.component';
import { DeleteConfirmationComponent } from '../../../../shared/components/delete-confirmation/delete-confirmation.component';
import { NotificationService } from '../../../../shared/services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-command-list',
  imports: [NgxPaginationModule, FormsModule, LoaderComponent , SearchFilterPipe],
  templateUrl: './command-list.component.html',
  styleUrl: './command-list.component.scss'
})
export class CommandListComponent {
  isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  columns: any;
  commandList :any
  searchKeyword: any;
  bsModalRef! : BsModalRef
  deviceId: any;
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  };

  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  };

  constructor(
    private commandService: CommandService,
    private modalService: BsModalService,
    private notificationSerivce: NotificationService,
    private route: ActivatedRoute,
    private router : Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.deviceId = params['deviceId'];
    });
   }

  ngOnInit() {
      this.setInitialTable();
      this.getCommandList();
  }

  getCommandList() {
    this.isLoading = true;
    this.commandService.commandList().subscribe((res: any) => {
      this.isLoading = false;
      this.commandList =  res?.body?.results?.data || [];
      this.pagesize.count = this.commandList?.length;
    })
  }

  setInitialTable() {
    this.columns = [
      {key: '', title : 'Id'},
      {key: '', title : 'Name'},
      {key: '', title : 'Command Name'},
      {key : '', title : 'Details'},
      {key : '', title : 'Action'},

    ]
  }

  get visibleColumns() {
    return this.columns.filter((col:any) =>
      !((!this.deviceId )  && col.title === 'Details')
    );
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
    this.getCommandList();
  }

  clearSearch() {
    this.searchKeyword = '';
    this.pagesize.offset = 1;
    this.pagesize.limit = 25;
    this.getCommandList();
  }

  onAddCommand(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateCommandComponent,
      Object.assign(initialState, {
        id: "confirmation",
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );

    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getCommandList();
    });
  }

  onDeleteCommand(item: any) {    
    let url = this.commandService.deleteCommand(item?.id);
    const initialState: ModalOptions = {
      initialState: {
        title: item?.name,
        content: 'Are you sure you want to delete?',
        primaryActionLabel: 'Delete',
        secondaryActionLabel: 'Cancel',
        service: url
      },
    };
    this.bsModalRef = this.modalService.show(
      DeleteConfirmationComponent,
      Object.assign(initialState, {
        id: "confirmation",
        class: "modal-md modal-dialog-centered",
      })
    );
    this.bsModalRef?.content.mapdata.subscribe(
      (value: any) => {
        if (value?.status == 200) {
          this.notificationSerivce.successAlert(value?.body?.message);
          this.pagesize.offset = 1;
          this.pagesize.limit = 25;
          this.getCommandList();
        } else {
          this.notificationSerivce.errorAlert(value?.title);
        }
      }
    );
  }

  onGetDetails(value:any) {
    this.router.navigate(['superadmin/command/command-details'], { queryParams: { deviceId: this.deviceId, commandId: value?.id } });
  }
}
