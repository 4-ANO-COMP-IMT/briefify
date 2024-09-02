import { Socket } from "socket.io";

const onConnection = (socket: Socket, secCount: number) => {
  console.log(`A user connected: ${socket.id}`);

  socket.emit("current_time", { time: secCount });
};

export default onConnection;
