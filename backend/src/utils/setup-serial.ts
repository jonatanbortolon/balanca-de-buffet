import { SerialPort } from "serialport";
import { Server } from "socket.io";
import { WEIGHT_RESULT } from "../enums/weight-result";
import { ClientToServerEvents, ServerToClientEvents } from "../types/socket-io";
import { formatBalanceWeight } from "./format-balance-weight";
import { getWeightData } from "./get-weight-data";
import { weightType } from "./weight-type";

export function setupSerial(
  serialPort: SerialPort,
  io: Server<ClientToServerEvents, ServerToClientEvents>,
) {
  serialPort.on("error", (err) => {
    console.log("Error: ", err.message);
  });

  let stabilityTimeout: NodeJS.Timeout;

  serialPort.on("data", (buffer) => {
    if (stabilityTimeout) {
      clearTimeout(stabilityTimeout);
    }

    stabilityTimeout = setTimeout(() => {
      const type = weightType(buffer);

      if (type !== WEIGHT_RESULT.OK) {
        console.log("Invalid weight: ", type);

        return;
      }

      const weigth = formatBalanceWeight(buffer);

      console.log("Weigth: ", weigth);

      const data = getWeightData(weigth);

      io.emit("weight", data);
    }, 1000);
  });
}
