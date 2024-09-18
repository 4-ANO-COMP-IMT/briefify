import cors from "cors";
import express from "express";

import { environments } from "src/shared/env/environments";
import signIn from "src/member/routes/sign-in";
import signUp from "src/member/routes/sign-up";
import user from "src/member/routes/user";

const server = async () => {

    const PORT = environments.MEMBER_PORT

    const app = express()
    app.use(express.json())
    app.use(cors())

    app.use(signIn);
    app.use(signUp);
    app.use(user);
    
    app.get('/', (req, res) => {
        res.send('API is running.')
    })

   

    app.listen(PORT, () => {
        console.log(`Member is running on port ${PORT}`)
    })   
}
server()

