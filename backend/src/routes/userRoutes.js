const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  return res.json({
    message: "Rota protegida funcionando.",
    user: req.user,
  });
});

module.exports = router;
