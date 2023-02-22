import express from "express";
import { register, login, googleAuth } from "../controllers/auth.js";

const router = express.Router();

// register user
router.post("/register", register);

// log in
router.post("/login", login);

// google auth
router.post("/google", googleAuth);

export default router;
