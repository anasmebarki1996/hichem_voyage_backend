const express = require("express");
const reservationController = require("../../controllers/reservationController");
const authMiddleware = require("./../../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/getAllReservations",
  authMiddleware.isAdmin,
  reservationController.getAllReservations
);
router.post(
  "/getReservation",
  authMiddleware.isAdmin,
  reservationController.getReservation
);

module.exports = router;
