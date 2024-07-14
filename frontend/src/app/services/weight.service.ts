import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Weight } from '../models/weight.model';

@Injectable({
  providedIn: 'root'
})
export class WeightService {
    lastWeight = this.socket.fromEvent<Weight>('weight');

    constructor(private socket: Socket) {}
}