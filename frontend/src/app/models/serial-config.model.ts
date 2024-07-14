export class SerialConfig {
  path: string = 'COM4';
  baudRate: number = 57600;
  stopBits: 1 | 1.5 | 2 = 1;
  dataBits: 8 | 5 | 6 | 7 = 8;
};
  