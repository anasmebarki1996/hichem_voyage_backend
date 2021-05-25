var connexion = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "idfqshkf;,qesrnfzeior,za;dsqjqsdf,;fnqsjk";
const JWT_EXPIRES_IN = 86400;

const signToken = (id) => {
  return jwt.sign(
    {
      id: id,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
};

exports.register = async (req) => {
  const { nom, prenom, email, password } = req.body;

  let user = await connexion.query("SELECT * FROM admin WHERE email=?", [
    email,
  ]);

  if (user.length) {
    throw { message: "email exist already", status: 401 };
  } else {
    let passwordHashed = await bcrypt.hash(password, 10);
    console.log(passwordHashed);
    let user = await connexion.query(
      "INSERT INTO admin (nom,prenom,email,password) VALUES (?,?,?,?)",
      [nom, prenom, email, passwordHashed]
    );
    return user;
  }
};

exports.login = async (req) => {
  try {
    const { email, password } = req.body;

    let user = await connexion.query("SELECT * FROM admin WHERE email=?", [
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
      }
    }

    throw {
      message:
        "Veuillez-vous vérifier votre email et votre mot de passe s'il vous plait",
      status: 401,
    };
  } catch (error) {
    if (error.message) throw { message: error.message, status: error.status };
    else throw { message: "something went wrong", status: 400 };
  }
};

exports.isAdmin = async (req) => {
  try {
    const { admin_id } = req.body;

    let admin = await connexion.query("SELECT * FROM admin WHERE id=?", [
      admin_id,
    ]);
    if (admin.length) {
      return admin[0];
    } else throw {};
  } catch (error) {
    throw {
      message:
        "Vous n'est plus connecté! Veuillez-vous vous connecter s'il vous plait",
      status: 401,
    };
  }
};
