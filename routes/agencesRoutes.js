const express = require("express");
const agenceController = require("./../controllers/agenceController");
const router = express.Router();

router.post("/createAgence", agenceController.createAgence);
router.post("/getAllAgences", agenceController.getAllAgences);
router.post("/getAgencesList", agenceController.getAgencesList);
router.post("/updateAgence", agenceController.updateAgence);

module.exports = router;
