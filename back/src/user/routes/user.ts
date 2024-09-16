import express from "express";
import userController from "src/user/controller/user-controller";

const router = express.Router();

router.route("/user").get(userController.getAllUsers);
router.route("/user/:id").get(userController.getUserById);

export default router;
