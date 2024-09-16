import express from 'express'
import { environments } from '../env/environments'


const server = async () => {

    const app = express();
    const port = environments.PORT
    const front_port = 5173;

    app.get("/", (req, res) => {
        res.send("EventBus is running");
    });

    app.post("/eventBus", (req, res) => {
        console.log(req.body);
        res.status(200).send({ status: "ok" });
    });

    app.listen(port, () => {
        console.log(`EventBus is running on port ${port}`);
    });
    }

server();