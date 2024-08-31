import { Socket } from "socket.io";

const onSendMessage = (socket: Socket) => {
  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });
};

export default onSendMessage;
