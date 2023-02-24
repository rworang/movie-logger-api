import express from "express";
import {
  update,
  deleteUser,
  getUser,
  unfollow,
  follow,
} from "../controllers/user.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// update user
router.put("/:id", verifyToken, update);

// delete user
router.delete("/:id", verifyToken, deleteUser);

// get user
router.get("/find/:id", getUser);

// follow user
router.put("/follow/:id", verifyToken, follow);

// unfollow user
router.put("/unfollow/:id", verifyToken, unfollow);

// get a user list
router.get("/:id?list=movies");

// get all user lists
router.get("/:id/lists");

export default router;
