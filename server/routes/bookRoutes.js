import express from "express";

import {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
  searchBooks,
} from "../controllers/bookController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getBooks);
router.get("/search", searchBooks);
router.get("/:id", getBook);

// Admin Routes
router.post(
  "/",
  protect,
  admin,
  upload.single("image"),
  createBook
);

router.put(
  "/:id",
  protect,
  admin,
  upload.single("image"),
  updateBook
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteBook
);

export default router;