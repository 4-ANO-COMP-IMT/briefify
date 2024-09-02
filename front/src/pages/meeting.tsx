import { UserContext } from "@/contexts/user-context";
import { useContext, useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { io, Socket } from "socket.io-client";
import { User, AudioLines } from "lucide-react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

import { getWaveBlob } from "webm-to-wav-converter";

export default function Meeting() {
  const { user } = useContext(UserContext);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [members, setMembers] = useState<string[]>([]);
  const [secCount, setSecCount] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [leaderId, setLeaderId] = useState<string>("");
  const recorderControls = useAudioRecorder({
    noiseSuppression: true,
    echoCancellation: true,
  });
  const [membersNames, setMembersNames] = useState<
    {
      id: string;
      name: string;
    }[]
  >([]);

  const [audioURL, setAudioURL] = useState<string>("");

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

  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    setAudioURL(url);

    console.log("Blob type:", blob.type);
    console.log("Blob size:", blob.size);
  };

  function startSecCount() {
    if (socket) {
      socket.emit("start_time");
      socket.emit("meeting_leader", { id: user?.id });

      recorderControls.startRecording();
    }
  }

  function stopSecCount() {
    if (socket) {
      socket.emit("stop_time");
      recorderControls.stopRecording();
    }
  }

  const fetchTranscription = async (blob: Blob) => {
    console.log("Recorder Blob:", recorderControls.recordingBlob);
    const webmBlob = blob;
    if (!webmBlob) return;

    console.log("Uploading file...");
    console.log(webmBlob.type);
    console.log(webmBlob.size);

    try {
      // const wavBlob = await convertWebMToWav(webmBlob);
      const wavBlob = await getWaveBlob(webmBlob, true);

      console.log(wavBlob.type);
      console.log(wavBlob.size);

      // Prepare form data to send to backend
      const formData = new FormData();
      formData.append("file", new File([webmBlob], `${user?.id}-audio.webm`));
      formData.append("meetingId", "oi"); // Replace with the actual meeting ID

      // Call your transcription endpoint
      await axios.post("http://localhost:3000/transcribe", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Transcription request sent successfully");
      window.location.replace("/resume");
    } catch (error) {
      console.error("Error fetching transcription:", error);
    }
  };

  useEffect(() => {
    if (recorderControls.recordingBlob) {
      fetchTranscription(recorderControls.recordingBlob);
    }
  }, [recorderControls.recordingBlob]); // os console.log nos eventos estao funcionando, mas por algum motivo n ta sendo exec esse useeefect

  useEffect(() => {
    const fetchMembersNames = async () => {
      const names: { id: string; name: string }[] = [];

      if (members.length > 0) {
        for (let i = 0; i < members.length; i++) {
          const response = await axios.get(
            `http://localhost:3000/user/${members[i]}`,
          );
          const nameSplited = response.data.name.split(" ");
          names.push({
            id: members[i],
            name: nameSplited[0] + " " + nameSplited[nameSplited.length - 1],
          });
        }
      }

      setMembersNames(names);
    };

    fetchMembersNames();
  }, [members]);

  const deleteOldTranscrptions = async () => {
    await axios.delete(`http://localhost:3000/transcribe`);
  };

  useEffect(() => {
    deleteOldTranscrptions();

    if (!user) {
      window.location.replace("/");
      return;
    }

    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    newSocket.emit("enter_meeting", { id: user.id });

    newSocket.on("meeting_members", (data) => {
      if (Array.isArray(data.members)) {
        const memberIds = data.members.map((member: any) => member.userId);
        setMembers(memberIds);
      }
    });

    newSocket.on("current_meeting_members", (data) => {
      if (Array.isArray(data.members)) {
        const memberIds = data.members.map((member: any) => member.userId);
        setMembers(memberIds);
      }
    });

    newSocket.on("start_recording", (data) => {
      setIsRecording(true);
      setLeaderId(data.leader_id);
    });

    let mediaRecorder: any;
    let chunks: any[] = [];

    newSocket.on("start_recording_as_member", (data) => {
      setIsRecording(true);
      setLeaderId(data.leader_id);
      recorderControls.startRecording();
      console.log("comecou");

      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.start();

          mediaRecorder.ondataavailable = function (e: any) {
            chunks.push(e.data);
          };

          mediaRecorder.onstop = function () {
            const blob = new Blob(chunks, { type: "audio/webm; codecs=opus" });
            chunks = [];
            fetchTranscription(blob);
            console.log("Blob gerado pelo MediaRecorder:", blob);
          };
        })
        .catch((err) => console.error("Erro ao acessar microfone:", err));
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

    newSocket.on("stop_recording_as_member", async () => {
      setIsRecording(false);
      recorderControls.stopRecording();
      console.log("terminou");

      if (mediaRecorder) {
        mediaRecorder.stop();
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (!isRecording) {
      console.log("Recording stopped. Checking blob...");
      console.log("Blob after stop:", recorderControls.recordingBlob);
    }
  }, [isRecording]);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="relative w-1/2 h-1/2">
        {isRecording && (
          <motion.div
            initial={{ opacity: 0.5, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.7,
              duration: 0.8,
              ease: "easeInOut",
              type: "spring",
              velocity: 0.8,
            }}
            style={{ width: "inherit" }}
            className="absolute flex h-20 -z-10 flex-row gap-2 rounded-t-lg -top-8 bg-red-600 text-white font-medium p-3 py-1"
          >
            <AudioLines />
            <p>Gravação Iniciada: {recorderControls.recordingTime} secs</p>
          </motion.div>
        )}
        <Card className="w-full h-full flex flex-row gap-4 p-4 z-20 overflow-hidden">
          <div className="h-full flex flex-col gap-4 w-2/3 overflow-hidden">
            <div className="w-full h-4/6 flex justify-center items-center bg-zinc-100 rounded-lg">
              <p className="text-7xl font-semibold">
                {hrCountDisplay}:{minCountDisplay}:{secCountDisplay}
              </p>
            </div>
            <button
              disabled={isRecording && leaderId !== user?.id}
              className={`${isRecording ? (leaderId !== user?.id ? "bg-gray-400 hover:bg-gray-500" : "bg-red-500 hover:bg-red-600") : "bg-green-400 hover:bg-green-500"} duration-200 h-2/6 w-full text-4xl font-medium rounded-lg text-white`}
              onClick={isRecording ? stopSecCount : startSecCount}
            >
              {isRecording ? "Encerrar" : "Começar"}
            </button>
          </div>
          <div className="w-[2px] h-full bg-neutral-200" />
          <div className="flex flex-col gap-2 w-1/3">
            <div className="flex flex-row justify-between pb-4">
              <p className="text-lg">Participantes</p>
              <p className="text-lg text-gray-400">Sala 1</p>
            </div>

            <AnimatePresence>
              {membersNames.length > 0 &&
                membersNames.map((member) => (
                  <motion.div
                    initial={{ opacity: 0.5, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0.5, x: 400 }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                      type: "spring",
                      velocity: 0.8,
                    }}
                    key={member.id}
                    className={`${leaderId === member.id ? "bg-slate-300" : "bg-zinc-200"} ${user?.id === member.id ? "border border-stone-500" : null} relative p-2 flex flex-row gap-1 items-center rounded`}
                  >
                    <p
                      className={`absolute text-2xl -rotate-45 -top-4 -left-3 ${leaderId === member.id ? null : "hidden"}`}
                    >
                      👑
                    </p>
                    <User />
                    <p className="font-medium text-sm">{member.name}</p>
                  </motion.div>
                ))}
            </AnimatePresence>
            <div className="sr-only">
              <AudioRecorder
                onRecordingComplete={(blob) => addAudioElement(blob)}
                recorderControls={recorderControls}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
