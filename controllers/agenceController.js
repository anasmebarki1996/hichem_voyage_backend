const Agence = require("../models/agenceModel");

exports.createAgence = async (req, res) => {
  try {
    await Agence.createAgence(req, res);
    res.status(200).json();
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};

exports.getAllAgences = async (req, res) => {
  try {
    const agences = await Agence.getAllAgences(req, res);
    res.status(200).json({
      status: "success",
      data: agences,
    });
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};

exports.getAgencesList = async (req, res) => {
  try {
    const agences = await Agence.getAgencesList(req, res);
    res.status(200).json({
      status: "success",
      data: agences,
    });
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};

exports.updateAgence = async (req, res) => {
  try {
    await Agence.updateAgence(req, res);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};
