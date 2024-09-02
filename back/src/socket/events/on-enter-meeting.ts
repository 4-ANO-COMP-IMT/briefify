import { Socket } from "socket.io";

const onEnterMeeting = (
  socket: Socket,
  membersSet: Set<{ socketId: string; userId: string }>,
) => {
  socket.on("enter_meeting", (data) => {
    membersSet.add({
      socketId: socket.id,
      userId: data.id,
    });

    console.log(Array.from(membersSet));
    console.log(Array.from(membersSet));

    socket.emit("current_meeting_members", { members: Array.from(membersSet) });
    socket.broadcast.emit("meeting_members", {
      id: socket.id,
      message: "A new user has joined the meeting",
      members: Array.from(membersSet),
    });
  });
};

export default onEnterMeeting;
