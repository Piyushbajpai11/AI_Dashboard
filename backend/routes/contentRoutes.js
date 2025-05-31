import express from "express";
const router = express.Router();
import { createContent, getAllContent, deleteContent, deleteAllContent } from "../controllers/contentController.js";
import protect from "../middleware/authMiddleware.js";

router.post("/generate", protect, createContent);
router.get("/history", protect, getAllContent);
router.delete("/delete/all", protect, deleteAllContent)
router.delete("/delete/:id", protect, deleteContent)



// module.expo/rts = router;
export default router;