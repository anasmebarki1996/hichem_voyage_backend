const express = require("express");
const reservationController = require("../controllers/reservationController");
const router = express.Router();

router.post("/createReservation", reservationController.createReservation);
router.post("/getAllReservations", reservationController.getAllReservations);
router.post("/getReservation", reservationController.getReservation);

module.exports = router;
