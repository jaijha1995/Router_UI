// websocket.service.ts
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: WebSocket;
  private messageSubject = new Subject<any>();
  private currentRouterId: number | null = null;

  constructor() {}

  public connect(routerId: number): void {
    this.currentRouterId = routerId;
    this.socket = new WebSocket('ws://143.110.242.217:8028/ws/mikrotik/');

    this.socket.onopen = (event) => {
      console.log('WebSocket connected');
      // Send initial message with current router ID
      this.sendMessage({ router_id: this.currentRouterId });
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.messageSubject.next(data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    this.socket.onerror = (event) => {
      console.error('WebSocket error:', event);
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket disconnected');
      this.messageSubject.complete();
    };
  }

  public sendMessage(message: any): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open. Cannot send message.');
    }
  }

  public updateRouterId(newRouterId: number): void {
    this.currentRouterId = newRouterId;
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.sendMessage({ router_id: this.currentRouterId });
    }
  }

  public getMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}
