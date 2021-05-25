var connexion = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "idfqshkf;,qesrnfzeior,za;dsqjqsdf,;fnqsjk";
const JWT_EXPIRES_IN = 86400000000000000;

exports.getAllUsers = async (req) => {
  try {
    let { limit, page, order, search } = req.body;
    let searchQuery = "";
    let queryData =
      "SELECT id,nom,prenom,date_naissance,email,num_tel,adresse FROM user";
    if (search) {
      searchQuery =
        " WHERE nom LIKE '%" +
        search +
        "%' OR prenom LIKE '%" +
        search +
        "%' OR email LIKE '%" +
        search +
        "%' OR num_tel LIKE '%" +
        search +
        "%' OR adresse LIKE '%" +
        search +
        "%'";
    }

    let queryLength = "SELECT count(*) as numberOfRow FROM user";

    queryData += searchQuery;
    queryLength += searchQuery;

    order = order ? " ORDER BY " + order : "";
    limit = limit ? limit : 5;
    page = page > 0 ? page * limit : 0;

    queryData += order + " LIMIT " + limit + " OFFSET " + page;
    console.log("queryData");
    console.log(queryData);

    let usersLength = await connexion.query(queryLength, []);
    let users = await connexion.query(queryData, []);

    return { data: users, dataLength: usersLength[0].numberOfRow };
  } catch (error) {
    throw { message: "something went wrong", status: 400 };
  }
};

exports.getUser = async (req) => {
  try {
    const { user_id } = req.body;

    let users = await connexion.query(
      "SELECT id,nom,prenom,date_naissance,email,num_tel,adresse FROM user WHERE id=?",
      [user_id]
    );

    console.log(users);
    return { data: users[0] };
  } catch (error) {
    console.log(error);
    if (error.message) throw { message: error.message, status: error.status };
    else throw { message: "something went wrong", status: 400 };
  }
};

const signToken = (id) => {
  return jwt.sign(
    {
      id: id,
    },
    process.env.JWT_SECRET
  );
};

exports.register = async (req) => {
  try {
    const { nom, prenom, email, password, date_naissance, num_tel, adresse } =
      req.body;
    let user = await connexion.query(
      "SELECT * FROM user WHERE email=? OR num_tel=?",
      [email, num_tel]
    );

    if (user.length) {
      throw { message: "email or phone number exist already", status: 401 };
    } else {
      let passwordHashed = await bcrypt.hash(password, 10);
      let user = await connexion.query(
        "INSERT INTO user (nom,prenom,email,password,date_naissance,num_tel,adresse) VALUES (?,?,?,?,?,?,?)",
        [nom, prenom, email, passwordHashed, date_naissance, num_tel, adresse]
      );
      return user;
    }
  } catch (error) {
    if (error.message) throw { message: error.message, status: error.status };
    else throw { message: "something went wrong", status: 400 };
  }
};

exports.login = async (req) => {
  try {
    const { email, password } = req.body;

    let user = await connexion.query("SELECT * FROM user WHERE email=?", [
      email,
    ]);

    if (user.length) {
      const validPassword = await bcrypt.compare(password, user[0].password);

      if (validPassword) {
        const { id, nom, prenom, email } = user[0];
        let token = await signToken(id);
        return {
          id: id,
          nom: nom,
          prenom: prenom,
          email: email,
          access_token: token,
          expires_in: JWT_EXPIRES_IN,
        };
      } else
        throw {
          message:
            "Veuillez-vous vérifier votre email et votre mot de passe s'il vous plait",
          status: 401,
        };
    }
  } catch (error) {
    console.log(error);
    if (error.message) throw { message: error.message, status: error.status };
    else throw { message: "something went wrong", status: 400 };
  }
};

exports.updateUserInformations = async (req) => {
  try {
    const { user_id, nom, prenom, date_naissance, num_tel, adresse } = req.body;
    await connexion.query(
      "UPDATE user SET nom=? ,prenom=? ,date_naissance=? ,num_tel=? ,adresse=? WHERE id=?",
      [nom, prenom, date_naissance, num_tel, adresse, user_id]
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

exports.updateUserPassword = async (req) => {
  try {
    const { user_id, password } = req.body;
    let passwordHashed = await bcrypt.hash(password, 10);
    await connexion.query("UPDATE user SET password=? WHERE id=?", [
      passwordHashed,
      user_id,
    ]);

    return;
  } catch (error) {
    throw {
      message:
        "Vous n'est plus connecté! Veuillez-vous vous connecter s'il vous plait",
      status: 401,
    };
  }
};

exports.deleteUser = async (req) => {
  try {
    const { user_id } = req.body;
    await connexion.query("DELETE FROM reservation WHERE user_id=?", [user_id]);
    await connexion.query("DELETE FROM user WHERE id=?", [user_id]);
  } catch (error) {
    throw { message: "Something went wrong", status: 404 };
  }
  return;
};

exports.isUser = async (req) => {
  try {
    const { user_id } = req.body;

    let user = await connexion.query("SELECT * FROM user WHERE id=?", [
      user_id,
    ]);
    if (user.length) {
      return user[0];
    } else throw {};
  } catch (error) {
    throw {
      message:
        "Vous n'est plus connecté! Veuillez-vous vous connecter s'il vous plait",
      status: 401,
    };
  }
};
