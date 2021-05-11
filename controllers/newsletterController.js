const Newsletter = require("../models/newsletterModel");

exports.createNewsletter = async (req, res) => {
  try {
    await Newsletter.createNewsletter(req, res);
    res.status(200).json({});
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};

exports.getNewsletter = async (req, res) => {
  try {
    const emails = await Newsletter.getNewsletter(req, res);
    res.status(200).json({
      status: "success",
      data: emails,
    });
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};
