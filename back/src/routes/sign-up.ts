import express from "express";
import signUpController from "src/controllers/sign-up-controller";

const router = express.Router();

router.route("/sign-up").post(signUpController.signUp);

export default router;
