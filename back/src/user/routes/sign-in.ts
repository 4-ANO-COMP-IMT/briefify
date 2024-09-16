import express from "express";
import signInController from "src/user/controller/sign-in-controller";

const router = express.Router();

router.route("/sign-in").post(signInController.signIn)

export default router;
