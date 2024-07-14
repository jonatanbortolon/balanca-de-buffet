export type SerialConfig = {
  path: string;
  baudRate: number;
  stopBits: 1 | 1.5 | 2;
  dataBits: 8 | 5 | 6 | 7;
};
