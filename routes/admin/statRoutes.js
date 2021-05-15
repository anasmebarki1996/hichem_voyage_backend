const express = require("express");
const statController = require("./../../controllers/statController");
const authMiddleware = require("./../../middlewares/authMiddleware");
const router = express.Router();

router.get("/stat", authMiddleware.isAdmin, statController.stat);

module.exports = router;
