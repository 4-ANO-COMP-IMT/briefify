import express from "express";
import userController from "src/controllers/user-controller";

const router = express.Router();

router.route("/user").get(userController.getAllUsers);

export default router;
