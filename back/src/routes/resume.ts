import express from "express";
import multer from "multer";
import transcribeController from "src/controllers/resume-controller";

const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

// Apply the multer middleware to the route
router.post(
  "/transcribe",
  upload.single("file"),
  transcribeController.transcribeAudio,
);
router.get("/transcribe", transcribeController.getAllTranscribe);
router.get("/transcribe/:id", transcribeController.generateResume);
router.delete("/transcribe", transcribeController.deleteAllTranscribe);

export default router;
