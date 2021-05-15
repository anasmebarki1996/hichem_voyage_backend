const express = require("express");
const newsletterController = require("../../controllers/newsletterController");
const router = express.Router();

router.post("/createNewsletter", newsletterController.createNewsletter);

module.exports = router;
