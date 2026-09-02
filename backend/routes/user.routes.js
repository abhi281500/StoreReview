import express from "express";

import {
  getStores,
  submitRating,
  updateRating,
  updatePassword,
} from "../controllers/user.controllers.js";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();

// All user routes require USER role
router.use(protect, authorize("USER"));

// Stores
router.get("/stores", getStores);

// Ratings
router.post("/ratings", submitRating);

router.put("/ratings/:storeId", updateRating);

// Password
router.put("/password", updatePassword);

export default router;