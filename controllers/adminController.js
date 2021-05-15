const Admin = require("./../models/adminModel");

exports.register = async (req, res) => {
  try {
    const admin = await Admin.register(req, res);
    console.log(admin);
    res.status(200).json();
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const admin = await Admin.login(req, res);
    console.log(admin);
    res.status(200).json(admin);
  } catch (error) {
    console.log(error);
    res.status(error.status).json(error.message);
  }
};

exports.logout = async (req, res, next) => {
  res.clearCookie("access_token");
  res.status(200).json({
    status: "success",
  });
};
