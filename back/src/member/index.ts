import cors from "cors";
import express from "express";
import signUpRoutes from "src/member/routes/sign-up";
import signInRoutes from "src/member/routes/sign-in";
import { environments } from "src/shared/env/environments";
import { Subscriber } from "src/shared/RabbitMQ/subscriber";

const app = express();
app.use(express.json());
app.use(cors());

// Rotas
app.use('/', signUpRoutes);
app.use('/', signInRoutes);

// Iniciando o subscriber para escutar a fila de "signup_queue"
const signUpSubscriber = new Subscriber('signup_queue', (message) => {
    console.log('Processed signup event:', message);
    // Processamento adicional, como enviar email de boas-vindas
});
signUpSubscriber.connect();

// Iniciando o subscriber para escutar a fila de "signin_queue"
const signInSubscriber = new Subscriber('signin_queue', (message) => {
    console.log('Processed signin event:', message);
    // Processamento adicional para eventos de sign-in
});
signInSubscriber.connect();

// Inicializando o servidor
const PORT = environments.MEMBER_PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
