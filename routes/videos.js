import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  addView,
  trend,
  random,
  sub,
  getByTag,
  search,
} from "../controllers/video.js";

const router = express.Router();

// create video
router.post("/", verifyToken, addVideo);

// update video
router.put("/:videoId", verifyToken, updateVideo);

// delete video
router.delete("/:videoId", verifyToken, deleteVideo);

// find video
router.get("/find/:videoId", getVideo);

// update viewcount
router.put("/view/:videoId", addView);

// get trending videos
router.get("/trend", trend);

// get random videos
router.get("/random", random);

// get videos from subbed
router.get("/sub", verifyToken, sub);

// get videos by tags
router.get("/tags", getByTag);

// get videos by title
router.get("/search", search);

export default router;
