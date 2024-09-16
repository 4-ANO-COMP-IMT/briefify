import express from "express";
import statusController from "src/transcription/controller/status-controller";

const router = express.Router();

router.route("/status").get(statusController.getStatus);

export default router;
