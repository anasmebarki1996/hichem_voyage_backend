const Reservation = require("./../models/reservationModel");

exports.createReservation = async (req, res) => {
  try {
    await Reservation.createReservation(req, res);
    res.status(200).json({});
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.getAllReservations(req, res);
    res.status(200).json({
      status: "success",
      data: reservations,
    });
  } catch (error) {
    console.log(error);
    res.status(error.status).json(error.message);
  }
};

exports.getReservation = async (req, res) => {
  try {
    const reservation = await Reservation.getReservation(req, res);
    res.status(200).json({
      status: "success",
      data: reservation,
    });
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    await Reservation.deleteReservation(req, res);
    res.status(200).json({});
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};
