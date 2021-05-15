const express = require("express");
const newsletterController = require("../../controllers/newsletterController");
const router = express.Router();
const authMiddleware = require("./../../middlewares/authMiddleware");

router.post(
  "/getAllnewsletters",
  authMiddleware.isAdmin,
  newsletterController.getAllnewsletters
);

module.exports = router;
