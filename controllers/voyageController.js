const Voyage = require("../models/voyageModel");

exports.getAllVoyages = async (req, res) => {
  try {
    const voyages = await Voyage.getAllVoyages(req, res);
    res.status(200).json({
      status: "success",
      data: voyages,
    });
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};

exports.getVoyage = async (req, res) => {
  try {
    const voyage = await Voyage.getVoyage(req, res);
    res.status(200).json({
      status: "success",
      data: voyage,
    });
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};

exports.createVoyage = async (req, res) => {
  try {
    await Voyage.createVoyage(req, res);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};

exports.deleteVoyage = async (req, res) => {
  try {
    await Voyage.deleteVoyage(req, res);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};

exports.updateVoyage = async (req, res) => {
  try {
    await Voyage.updateVoyage(req, res);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};
