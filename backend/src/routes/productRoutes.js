const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const {
  createProduct,
  listProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", listProducts);

router.post("/", authMiddleware, adminMiddleware, createProduct);
router.put("/:id", authMiddleware, adminMiddleware, updateProduct);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;
