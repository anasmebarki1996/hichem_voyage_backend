const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.register = async (req, res) => {
  try {
    await User.register(req, res);
    res.status(200).json();
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const admin = await User.login(req, res);
    console.log(admin);
    res.status(200).json(admin);
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};

exports.logout = async (req, res, next) => {
  res.clearCookie("agent_jwt");
  res.status(200).json({
    status: "success",
  });
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers(req, res);
    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.getUser(req, res);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};

exports.updateUserInformations = async (req, res) => {
  try {
    await User.updateUserInformations(req, res);
    res.status(200).json();
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};
exports.updateUserPassword = async (req, res) => {
  try {
    await User.updateUserPassword(req, res);
    res.status(200).json();
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.deleteUser(req, res);
    res.status(200).json();
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};
