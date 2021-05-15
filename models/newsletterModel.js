var connexion = require("../config/db");

exports.createNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    await connexion.query("INSERT INTO newsletter (email) VALUES (?)", [email]);
    return;
  } catch (error) {
    throw { message: "something went wrong", status: 403 };
  }
};

exports.getAllnewsletters = async (req, res) => {
  try {
    let { email, order, page, limit } = req.body;
    let searchQuery = "";
    let queryData = "SELECT email FROM newsletter WHERE ";
    if (email) searchQuery += " email LIKE '%" + email + "%' AND";
    searchQuery += " 1=1";

    let queryLength = "SELECT count(*) as numberOfRow FROM newsletter WHERE ";
    queryData += searchQuery;
    queryLength += searchQuery;

    order = order ? " ORDER BY " + order : "";
    limit = limit ? limit : 5;
    page = page > 0 ? page * limit : 0;
    queryData += order + " LIMIT " + limit + " OFFSET " + page;
    let emailsLength = await connexion.query(queryLength, []);
    let emails = await connexion.query(queryData, []);

    return {
      data: emails,
      dataLength: emailsLength[0].numberOfRow,
    };
  } catch (error) {
    console.log(error);
    throw { message: "something went wrong", status: 403 };
  }
};
