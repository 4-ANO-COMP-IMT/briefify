import express from "express";
import authController from "src/controllers/auth-controller";

const router = express.Router();

router.route("/sign-up").post(authController.signUpUser);

export default router;
