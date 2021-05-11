const express = require("express");
const newsletterController = require("../controllers/newsletterController");
const router = express.Router();

router.post("/createNewsletter", newsletterController.createNewsletter);
router.post("/getNewsletter", newsletterController.getNewsletter);

module.exports = router;
