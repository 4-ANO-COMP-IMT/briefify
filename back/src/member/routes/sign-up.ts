import express from "express";
import signUpController from "src/member/modules/sign-up/sign-up-controller";

const router = express.Router();

router.route("/sign-up").post(signUpController.signUp);

export default router;
