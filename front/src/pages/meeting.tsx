import { UserContext } from "@/contexts/user-context";
import { useContext, useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { io, Socket } from "socket.io-client";
import { User } from "lucide-react";

export default function Meeting() {
  const { user } = useContext(UserContext);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [members, setMembers] = useState<string[]>([]);
  const [secCount, setSecCount] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const minCount = useMemo(() => Math.floor(secCount / 60), [secCount]);
  const hrCount = useMemo(() => Math.floor(minCount / 60), [minCount]);

  const hrCountDisplay = useMemo(
    () => hrCount.toString().padStart(2, "0"),
    [hrCount],
  );
  const minCountDisplay = useMemo(
    () => minCount.toString().padStart(2, "0"),
    [minCount],
  );
  const secCountDisplay = useMemo(
    () => (secCount % 60).toString().padStart(2, "0"),
    [secCount],
  );

  function startSecCount() {
    if (socket) {
      socket.emit("start_time");
    }
  }

  function stopSecCount() {
    if (socket) {
      socket.emit("stop_time");
    }
  }

  useEffect(() => {
    if (!user) {
      window.location.replace("/");
      return;
    }

    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    newSocket.on("receive_message", (data) => {
      alert(data.message);
    });

    newSocket.on("meeting_members", (data) => {
      setMembers(data.members);
    });

    newSocket.on("current_meeting_members", (data) => {
      setMembers(data.members);
    });

    newSocket.on("start_recording", () => {
      setIsRecording(true);
    });

    newSocket.on("update_time", (data) => {
      setSecCount(data.time);
      if (!isRecording) {
        setIsRecording(true);
      }
    });

    newSocket.on("stop_recording", () => {
      setIsRecording(false);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Card className="w-1/2 h-1/2 flex flex-row gap-4 p-4">
        <div className="h-full flex flex-col gap-4 w-2/3 overflow-hidden">
          <div className="w-full h-4/6 flex justify-center items-center bg-zinc-100 rounded-lg">
            <p className="text-7xl font-semibold">
              {hrCountDisplay}:{minCountDisplay}:{secCountDisplay}
            </p>
          </div>
          <button
            className={`${isRecording ? "bg-red-400 hover:bg-red-500" : "bg-green-400 hover:bg-green-500"} duration-200 h-2/6 w-full text-4xl font-medium rounded-lg`}
            onClick={isRecording ? stopSecCount : startSecCount}
          >
            {isRecording ? "Stop" : "Start"}
          </button>
        </div>
        <div className="w-[2px] h-full bg-neutral-200" />
        <div className="flex flex-col gap-2 w-1/3">
          <div className="flex flex-row justify-between pb-4">
            <p className="text-lg">Participantes</p>
            <p className="text-lg text-gray-400">Sala 1</p>
          </div>
          {members.length > 0 &&
            members.map((member) => (
              <div
                key={member}
                className="bg-zinc-200 p-2 flex flex-row gap-1 items-center rounded"
              >
                <User />
                <p className="font-medium text-sm">{member}</p>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
}
