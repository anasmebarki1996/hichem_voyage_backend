const Admin = require("./../models/adminModel");
const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.isAdmin = async (req, res, next) => {
  try {
    let token = "";
    // 1) Getting token and check of it's there
    if (req.headers.cookie) {
      token = req.headers.cookie.split("access_token=")[1];
    } else if (req.headers.authorization) {
      token = req.headers.authorization;
    }

    if (!token) {
      throw {};
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    req = { ...req, body: { ...req.body, admin_id: decoded.id } };
    // // 3) Check if agent still exists
    const currentAgent = await Admin.isAdmin(req, res);

    if (!currentAgent) {
      throw {};
    }
    next();
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json(
        "Vous n'est plus connecté! Veuillez-vous vous connecter s'il vous plait"
      );
  }
};

exports.isUser = async (req, res, next) => {
  try {
    // 1) Getting token and check of it's there
    let token;
    if (req.headers.cookie) {
      token = req.headers.cookie.split("access_token=")[1];
    } else if (req.headers.authorization) {
      token = req.headers.authorization;
    }

    if (!token) {
      throw {};
    }

    console.log(token);

    // 2) Verification token

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    req.body.user_id = decoded.id;

    // // 3) Check if agent still exists
    const currentAgent = await User.isUser(req, res);
    console.log(currentAgent);
    if (!currentAgent) {
      throw {};
    }

    next();
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json(
        "Vous n'est plus connecté! Veuillez-vous vous connecter s'il vous plait"
      );
  }
};
