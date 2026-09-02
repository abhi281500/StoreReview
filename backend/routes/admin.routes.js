import express from "express";

import {
  getDashboard,
  createUser,
  createAdmin,
  createStore,
  getUsers,
  getUserById,
  getStores,
  createStoreOwner
} from "../controllers/admin.controllers.js";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();

// All admin routes require ADMIN role
router.use(protect, authorize("ADMIN"));

// Dashboard
router.get("/dashboard", getDashboard);

// Create users/admin/store
router.post("/users", createUser);
router.post("/admins", createAdmin);
router.post("/store-owners", createStoreOwner);
router.post("/stores", createStore);

// Listings
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.get("/stores", getStores);

export default router;