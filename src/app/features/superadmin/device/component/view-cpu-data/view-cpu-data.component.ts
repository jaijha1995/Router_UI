import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchFilterPipe } from '../../../../shared/pipe/search.pipe';
import { DatePipe, DecimalPipe } from '@angular/common';
import { DeviceService } from '../../services/device.service';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../../../shared/services/web-socket.service';

@Component({
  selector: 'app-view-cpu-data',
  imports: [NgxPaginationModule, DatePipe, DecimalPipe],
  templateUrl: './view-cpu-data.component.html',
  styleUrl: './view-cpu-data.component.scss'
})
export class ViewCpuDataComponent {
  isLoading: boolean = false;
  data: any;
  deviceId: any;
  detailsData: any;

  private subscription!: Subscription;
  public receivedData: any;

  constructor(
    private bsModalService: BsModalService,
    private DeviceService: DeviceService,
    private webSocketService: WebSocketService
  ) { }

  ngOnInit() {
    console.log(this.detailsData);
    
    if (this.detailsData?.id) {
      this.webSocketService.connect(this.detailsData.id);
      
      this.subscription = this.webSocketService.getMessages().subscribe(
        (data) => {
          this.data = data;
          console.log('Received data:', data);
        },
        (error) => {
          console.error('WebSocket error:', error);
        }
      );
    } else {
      console.warn('Cannot connect - detailsData.id is not available');
    }
  }

  updateRouterId(newId: number): void {
    this.webSocketService.updateRouterId(newId);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.webSocketService.disconnect();
  }

  close() {
    this.bsModalService.hide();
  }
}