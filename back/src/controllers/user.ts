import express from "express";
import { RepositoryMock } from "../repository/repository-mock";

const router = express.Router();
const repo = new RepositoryMock();

router.get("/user/:id", (req, res) => {
  try {
    const user = repo.getUser(req.params.id);

    if (!user) {
      res.sendStatus(404);
    }

    res.send(user);
  } catch (error) {
    console.log("Error: " + error);
  }
});

router.get("/user", (req, res) => {
  try {
    const user = repo.getAllUsers();

    if (!user) {
      res.sendStatus(404);
    }

    res.send(user);
  } catch (error) {
    console.log("Error: " + error);
  }
});

router.post("/user", (req, res) => {
  try {
    const { name, email, cpf, password, company } = req.body;

    const user = repo.createUser(name, email, cpf, password, company);

    if (!user) {
      res.status(500);
    }

    res.status(201).send(user);
  } catch (error) {
    console.log("Error: " + error);
  }
});

router.post("/sign-in", (req, res) => {
  try {
    const { email, password } = req.body;

    const user = repo.signInUser(email, password);

    if (!user) {
      res.sendStatus(404);
    }

    res.status(200).send(user);
  } catch (error) {
    console.log("Error: " + error);
  }
});

export default router;
