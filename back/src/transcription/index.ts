import cors from "cors";
import express from "express";

import { environments } from "src/env/environments";
import resume from "src/transcription/routes/resume"


const server = async () => {

    const PORT = environments.TRANSCRIPTION_PORT

    const app = express()
    app.use(express.json())
    app.use(cors())

    app.use(resume);

    
    app.get('/', (req, res) => {
        res.send('API is running.')
    })

    app.post('/eventBus', (req, res) => {
        console.log('eventBus is listening.')
        res.status(200).send({ msg: 'OK' })
    })

    app.listen(PORT, () => {
        console.log(`Transcription is running on port ${PORT}`)
    })   
}
server()

