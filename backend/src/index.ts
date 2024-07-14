import "dotenv/config";
import { SerialPort } from "serialport";
import { Server } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "./types/socket-io";
import { setupSerial } from "./utils/setup-serial";

const PORT = parseInt(process.env.PORT || "3000");

let serialPort = new SerialPort({
  path: "COM4",
  baudRate: 57600,
  stopBits: 1,
  dataBits: 8,
});

const io = new Server<ClientToServerEvents, ServerToClientEvents>(PORT);

setupSerial(serialPort, io);

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

    setupSerial(serialPort, io);

    socket.emit("serialConfig", {
      path: data.path,
      baudRate: data.baudRate,
      stopBits: data.stopBits,
      dataBits: data.dataBits,
    });
  });
});
