import express from "express";
import statusController from "src/controllers/status-controller";

const router = express.Router();

router.route("/status").get(statusController.getStatus);

export default router;
