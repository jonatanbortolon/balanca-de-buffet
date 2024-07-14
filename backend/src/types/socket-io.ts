import { SerialConfig } from "./serial-config";
import { Weight } from "./weight";

export type ClientToServerEvents = {
  changeSerialConfig: (data: SerialConfig) => void;
};

export type ServerToClientEvents = {
  serialConfig: (data: SerialConfig) => void;
  weight: (data: Weight) => void;
};
