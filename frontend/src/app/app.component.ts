import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription, startWith } from 'rxjs';
import { SerialConfig } from './models/serial-config.model';
import { Weight } from './models/weight.model';
import { SerialConfigService } from './services/serial-config.service';
import { WeightService } from './services/weight.service';
import { MatSelectChange } from '@angular/material/select';
import { Dialog } from '@angular/cdk/dialog';
import { WeightDialogComponent } from './weight-dialog/weight-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  config: SerialConfig = new SerialConfig;

  private _serialConfigSub: Subscription | null = null;
  private _weightSub: Subscription | null = null;

  constructor(
    private serialConfigService: SerialConfigService,
    private weightService: WeightService,
    public dialog: Dialog
  ) { }

  ngOnInit() {
    this._serialConfigSub = this.serialConfigService.config.pipe(
      startWith(new SerialConfig)
    ).subscribe(serialConfig => this.config = serialConfig);

    this._weightSub = this.weightService.lastWeight.subscribe(weight => {
      if (this.isWeightDialogOpen()) {
        this.closeWeightDialog();
      }

      this.openWeightDialog(weight);
    });
  }

  ngOnDestroy() {
    this._serialConfigSub?.unsubscribe();
    this._weightSub?.unsubscribe();
  }

  closeWeightDialog(): void {
    this.dialog.closeAll();
  }

  isWeightDialogOpen(): boolean {
    return this.dialog.openDialogs.length > 0;
  }

  openWeightDialog(weight: Weight): void {
    this.dialog.open(WeightDialogComponent, {
      minWidth: '300px',
      data: weight,
    });
  }

  onSerialConfigPathChange(event: Event) {
    const target = event.target as HTMLInputElement;

    this.config.path = target.value;

    this.serialConfigService.updateSerialConfig(this.config);
  }

  onSerialConfigBaudRateChange(event: Event) {
    const target = event.target as HTMLInputElement;

    const value = parseInt(target.value);

    if (isNaN(value)) {
      return;
    }

    this.config.baudRate = value;

    this.serialConfigService.updateSerialConfig(this.config);
  }

  onserialConfigDataBitsChange(event: MatSelectChange) {
    const target = event.value

    const value = parseInt(target.value);

    if (isNaN(value)) {
      return;
    }

    this.config.dataBits = value as SerialConfig['dataBits'];

    this.serialConfigService.updateSerialConfig(this.config);
  }

  onSerialConfigStopBitsChange(event: MatSelectChange) {
    const target = event.value

    const value = parseInt(target.value);

    if (isNaN(value)) {
      return;
    }

    this.config.stopBits = value as SerialConfig['stopBits'];

    this.serialConfigService.updateSerialConfig(this.config);
  }
}
