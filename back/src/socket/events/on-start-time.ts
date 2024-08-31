import { Socket } from "socket.io";

const onSendMessage = (socket: Socket) => {
  let secCount = 0;
  let isCounting = false;
  let intervalId: NodeJS.Timeout | null = null;
  let timerStarter: string | null = null; // Store the ID of the user who started the timer

  socket.on("start_time", () => {
    // Store the ID of the user who started the timer
    timerStarter = socket.id;

    socket.emit("start_recording");
    socket.broadcast.emit("start_recording");

    if (!isCounting) {
      isCounting = true;
      intervalId = setInterval(() => {
        secCount += 1;
        socket.emit("update_time", { time: secCount });
        socket.broadcast.emit("update_time", { time: secCount });
      }, 1000);
    }
  });

  socket.on("stop_time", () => {
    if (isCounting && intervalId && socket.id === timerStarter) {
      clearInterval(intervalId);
      isCounting = false;
      socket.emit("stop_recording");
      socket.broadcast.emit("stop_recording");
      intervalId = null;
      timerStarter = null;
    }
  });
};

export default onSendMessage;
