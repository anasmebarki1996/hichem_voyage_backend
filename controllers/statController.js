const Stat = require("./../models/statModel");

exports.stat = async (req, res) => {
  try {
    const stat = await Stat.stat(req, res);

    res.status(200).json({
      status: "success",
      data: stat,
    });
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};
