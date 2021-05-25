var connexion = require("../config/db");

exports.createAgence = async (req) => {
  try {
    const { nom, adresse, longitude, latitude, wilaya } = req.body;
    let agence = await connexion.query(
      "INSERT INTO agence (nom,adresse,longitude,latitude,wilaya) VALUES (?,?,?,?,?,?,?)",
      [nom, adresse, longitude, latitude, wilaya]
    );
    return agence;
  } catch (error) {
    throw { message: "something went wrong", status: 400 };
  }
};

exports.updateAgence = async (req) => {
  try {
    const { id, nom, adresse, longitude, latitude, wilaya } = req.body;
    await connexion.query(
      "UPDATE agence SET nom=? ,adresse=? ,longitude=? ,latitude=? ,wilaya=? WHERE id=",
      [nom, adresse, longitude, latitude, wilaya, id]
    );

    return;
  } catch (error) {
    throw {
      message:
        "Vous n'est plus connecté! Veuillez-vous vous connecter s'il vous plait",
      status: 401,
    };
  }
};

exports.getAllAgences = async (req) => {
  try {
    let { limit, page, order, search } = req.body;
    let searchQuery = "";
    let queryData =
      "SELECT id,nom,adresse,longitude,latitude,wilaya FROM agence";
    if (search) {
      searchQuery =
        " WHERE nom LIKE '%" +
        search +
        "%' OR adresse LIKE '%" +
        search +
        "%' OR adresse LIKE '%" +
        search +
        "%'";
    }

    let queryLength = "SELECT count(*) as numberOfRow FROM agence";

    queryData += searchQuery;
    queryLength += searchQuery;

    order = order ? " ORDER BY " + order : "";
    limit = limit ? limit : 5;
    page = page > 0 ? page * limit : 0;

    queryData += order + " LIMIT " + limit + " OFFSET " + page;

    let usersLength = await connexion.query(queryLength, []);
    let users = await connexion.query(queryData, []);

    return { data: users, dataLength: usersLength[0].numberOfRow };
  } catch (error) {
    throw { message: "something went wrong", status: 400 };
  }
};

exports.getAgencesList = async (req) => {
  try {
    let queryData = "SELECT id, CONCAT ( nom,' ',wilaya) as value FROM agence";

    let agences = await connexion.query(queryData, []);

    return { data: agences };
  } catch (error) {
    throw { message: "something went wrong", status: 400 };
  }
};
