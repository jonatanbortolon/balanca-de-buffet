import "dotenv/config";
import { SerialPort } from "serialport";
import { Server } from "socket.io";
import { WEIGHT_RESULT } from "./enums/weight-result";
import { ClientToServerEvents, ServerToClientEvents } from "./types/socket-io";
import { formatBalanceWeight } from "./utils/format-balance-weight";
import { getWeightData } from "./utils/get-weight-data";
import { weightType } from "./utils/weight-type";

const PORT = parseInt(process.env.PORT || "3000");

let serialPort = new SerialPort({
  path: "COM4",
  baudRate: 57600,
  stopBits: 1,
  dataBits: 8,
});

const io = new Server<ClientToServerEvents, ServerToClientEvents>(PORT);

io.on("connection", (socket) => {
  console.log("Connection", socket.id);

  socket.emit("serialConfig", {
    path: serialPort.settings.path,
    baudRate: serialPort.settings.baudRate,
    stopBits: serialPort.settings.stopBits || 1,
    dataBits: serialPort.settings.dataBits || 8,
  });

  socket.on("changeSerialConfig", (data) => {
    console.log("changeSerialConfig", data);

    serialPort = new SerialPort({
      path: data.path,
      baudRate: data.baudRate,
      stopBits: data.stopBits,
      dataBits: data.dataBits,
    });

    socket.emit("serialConfig", {
      path: data.path,
      baudRate: data.baudRate,
      stopBits: data.stopBits,
      dataBits: data.dataBits,
    });
  });
});

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
