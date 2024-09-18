import express from 'express'
import { environments } from '../env/environments'


const server = async () => {

    const app = express();
    const EVENTBUS = environments.EVENTBUS_PORT
    const MEMBER_PORT = environments.MEMBER_PORT
    const TRANSCIPTION_PORT = environments.TRANSCRIPTION_PORT


    app.get("/", (req, res) => {
        res.send("EventBus is running");
    });

    app.post("/eventBus", (req, res) => {
        console.log(req.body);
        res.status(200).send({ status: "ok" });
    });

    app.listen(EVENTBUS, () => {
        console.log(`EventBus is running on port ${EVENTBUS}`);
    });
    }

server();