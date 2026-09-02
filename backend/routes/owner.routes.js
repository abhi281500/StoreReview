import express from "express";

import {
  getOwnerDashboard,
  getOwnerRatings,
  updateOwnerPassword,
} from "../controllers/owner.controllers.js";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();

// Only STORE_OWNER can access these routes
router.use(
  protect,
  authorize("STORE_OWNER")
);

// Dashboard
router.get(
  "/dashboard",
  getOwnerDashboard
);

// Users who submitted ratings
router.get(
  "/ratings",
  getOwnerRatings
);

// Update password
router.put(
  "/password",
  updateOwnerPassword
);

export default router;