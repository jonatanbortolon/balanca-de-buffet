import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { WeightService } from './services/weight.service';
import { SerialConfigService } from './services/serial-config.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { WeightDialogComponent } from './weight-dialog/weight-dialog.component';

const config: SocketIoConfig = { url: 'http://localhost:3023', options: {
  transports: ['websocket'],
} };

@NgModule({
  declarations: [
    AppComponent,
    WeightDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule
  ],
  providers: [
    WeightService,
    SerialConfigService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
