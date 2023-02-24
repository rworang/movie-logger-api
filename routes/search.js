import express from "express";
import { multiSearch } from "../controllers/search.js";

const router = express.Router();

// multi search
router.get("/multi", multiSearch);

export default router;
