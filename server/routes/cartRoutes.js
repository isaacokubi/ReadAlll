import express from "express";

import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
} from "../controllers/cartController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", addToCart);

router.get("/", getCart);

router.put(
  "/:bookId",
  updateCartItem
);

router.delete(
  "/:bookId",
  removeCartItem
);

export default router;