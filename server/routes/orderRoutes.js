import express from "express";

import {
  createOrder
} from "../controllers/orderController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

// Customer Routes
router.post(
  "/",
  protect,
  createOrder
);

router.get(
  "/my-orders",
  protect,
  //getMyOrders
);

router.get(
  "/:id",
  protect,
  //getOrderById
);

// Admin Routes
router.get(
  "/",
  protect,
  admin,
  //getOrders
);

router.put(
  "/:id/status",
  protect,
  admin,
  //updateOrderStatus
);

export default router;