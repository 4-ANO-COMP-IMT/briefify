import express, { Express } from "express";
import dotenv from "dotenv";
import status from "src/routes/status";
import signIn from "src/routes/sign-in";
import signUp from "src/routes/sign-up";
import user from "src/routes/user";
import resume from "src/routes/resume";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import handleSocketEvents from "./socket/socket";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const FRONT_PORT = 5173;

app.use(
  cors({
    origin: [`http://localhost:5173`, `http://localhost:5174`],
    methods: ["GET", "POST"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(status);
app.use(signIn);
app.use(signUp);
app.use(user);
app.use(resume);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [`http://localhost:5173`, `http://localhost:5174`],
    methods: ["GET", "POST"],
  },
});

handleSocketEvents(io);

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
