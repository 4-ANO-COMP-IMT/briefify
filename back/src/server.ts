import express, { Express } from "express";
import dotenv from "dotenv";
import user from "./controllers/user-controller";
import status from "src/routes/status";
import signIn from "src/routes/sign-in";
import signUp from "src/routes/sign-up";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(user);
app.use(status);
app.use(signIn);
app.use(signUp);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
