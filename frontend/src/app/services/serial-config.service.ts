import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SerialConfig } from '../models/serial-config.model';

@Injectable({
  providedIn: 'root'
})
export class SerialConfigService {
  config = this.socket.fromEvent<SerialConfig>('serialConfig');

  constructor(private socket: Socket) {
    this.socket.on('connect_error', (reason: any) => {
      console.log(reason);
    })
  }

  updateSerialConfig(data: SerialConfig) { 
    this.socket.emit('changeSerialConfig', data);
  }
}