import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { CommonModule } from '@angular/common';
import { delay } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-live-device-data',
  standalone: true,
  imports: [CommonModule, FormsModule , LoaderComponent],
  templateUrl: './live-device-data.component.html',
  styleUrls: ['./live-device-data.component.scss']
})
export class LiveDeviceDataComponent implements OnInit, OnDestroy {
  detailsData: any [] = [];
  command: string = 'print'; 
  commandLine: string = '';
  private socket$!: WebSocketSubject<any>;
  private connectionAttempts: number = 0;
  private maxConnectionAttempts: number = 3;
  private retryDelay: number = 3000; 
  private isConnected: boolean = false;
  isLoading: boolean = false;
  details:any

  constructor(
    private modalService: BsModalService,
  ) {}

  ngOnInit(): void {
    this.connectWebSocket();
  }

  ngOnDestroy(): void {
    this.closeWebSocket();
  }

  private connectWebSocket(): void {
    console.log('Attempting WebSocket connection...');
    
    this.socket$ = webSocket({
      url: 'ws://3.110.185.148:8002/ws/',
      openObserver: {
        next: () => {
          console.log('WebSocket connection established');
          this.connectionAttempts = 0;
          this.isConnected = true;
          // Add a small delay before sending the initial command
          setTimeout(() => {
            this.sendInitialCommand();
          }, 500);
        }
      }
    });

    this.socket$.subscribe({
      next: (response) => {
        console.log('WebSocket response:', response);
        switch(this.command) {
          case 'print':
            this.detailsData = response?.results["/interface/vlan/print"];
            break;
          case 'nat':
            this.detailsData = response?.results["/ip/firewall/nat"];
            break;
          case 'vlan':
            this.detailsData = response?.results['/interface/vlan'];
            break;
          default:
            this.detailsData = [];
        }
        this.isLoading = false;        
      },
      error: (error) => {
        console.error('WebSocket error:', error);
        this.isConnected = false;
        this.isLoading = false;
        this.handleConnectionError();
      },
      complete: () => {
        console.log('WebSocket connection closed');
        this.isConnected = false;
      }
    });
  }

  private sendInitialCommand(): void {    
    if (!this.isConnected) {
      console.warn('WebSocket not connected. Cannot send command.');
      return;
    }

    if (this.command === 'print') {
      this.getDeviceDetails('/interface/vlan/print');
    } else if (this.command === 'nat') {
      this.getDeviceDetails('/ip/firewall/nat');
    } else if (this.command === 'vlan') {
      this.getDeviceDetails('/interface/vlan');
    }
  }

  private handleConnectionError(): void {
    this.connectionAttempts++;
    if (this.connectionAttempts < this.maxConnectionAttempts) {
      console.log(`Retrying connection in ${this.retryDelay/1000} seconds... (Attempt ${this.connectionAttempts})`);
      setTimeout(() => this.connectWebSocket(), this.retryDelay);
    } else {
      console.error('Max connection attempts reached. Please check your network or server status.');
    }
  }

  private closeWebSocket(): void {
    if (this.socket$ && !this.socket$.closed) {
      this.socket$.complete();
      this.isConnected = false;
      console.log('WebSocket connection intentionally closed');
    }
  }

  getDeviceDetails(command: string): void {
    if (!this.isConnected) {
      console.warn('WebSocket not connected. Attempting to reconnect...');
      this.connectWebSocket();
      return;
    }
    this.isLoading = true;

    switch(command) {
      case '/interface/vlan/print':
        this.command = 'print';
        break;
      case '/ip/firewall/nat':
        this.command = 'nat';
        break;
      case '/interface/vlan':
        this.command = 'vlan';
        break;
      default:
        this.command = 'default';
    }

    const message = {
      device_id: this.details?.id, 
      commands: [command]
    };
    
    console.log('Sending WebSocket message:', message);
    try {
      this.socket$.next(message);
    } catch (error) {
      console.error('Error sending message:', error);
      this.handleConnectionError();
      this.isLoading = false;
    }
  }

  sendCustomCommand(): void {
    if (this.commandLine.trim() && this.isConnected) {
      this.getDeviceDetails(this.commandLine.trim());
      this.commandLine = '';
    }
  }

  close(){
    this.modalService.hide();
  }
}