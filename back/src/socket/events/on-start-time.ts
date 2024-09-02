import { Socket } from "socket.io";

const onStartTime = (socket: Socket, meetingLeader: string) => {
  let secCount = 0;
  let isCounting = false;
  let intervalId: NodeJS.Timeout | null = null;
  let timerStarter: string | null = null;

  socket.on("start_time", () => {
    if (!isCounting) {
      timerStarter = socket.id;
      isCounting = true;

      socket.on("meeting_leader", (data) => {
        meetingLeader = data.id;
        socket.emit("start_recording", { leader_id: data.id });
        socket.broadcast.emit("start_recording_as_member", {
          leader_id: data.id,
        });
      });

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
      secCount = 0;
      socket.emit("stop_recording");
      socket.broadcast.emit("stop_recording_as_member");
      intervalId = null;
      timerStarter = null;
    }
  });
};

export default onStartTime;
