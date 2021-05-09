var connexion = require("./../config/db");

exports.createReservation = async (req, res) => {
  try {
    const {
      date_reservation,
      heure_reservation,
      nombre_place,
      voyage_id,
      user_id,
    } = req.body;
    let place_restante = await connexion.query(
      "SELECT (voyage.max_place - SUM(nombre_place)) as place_restante FROM reservation , voyage WHERE reservation.voyage_id = voyage.id and voyage_id = ? and reservation.status='valide'",
      [voyage_id]
    );

    if (place_restante[0].place_restante >= nombre_place) {
      await connexion.query(
        "INSERT INTO reservation (date_reservation,heure_reservation,nombre_place,status,voyage_id,user_id) VALUES (?,?,?,'active',?,?)",
        [date_reservation, heure_reservation, nombre_place, voyage_id, user_id]
      );
      return;
    } else throw { message: "il ne reste pas asssez de place ", status: 401 };
  } catch (error) {
    if (error.message) throw { message: error.message, status: error.status };
    else throw { message: "something went wrong", status: 403 };
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    let {
      user_id,
      lieu_depart,
      lieu_arrive,
      date_depart,
      limit,
      page,
      order,
    } = req.body;
    let searchQuery = "";
    let queryData =
      "SELECT nom , prenom , num_tel , prix , duree , date_reservation,heure_reservation ,nombre_place ,status , moyen_transport, date_depart , heure_depart , lieu_depart , lieu_arrive ,voyage.id ,max_place FROM reservation , user , voyage WHERE reservation.user_id = user.id AND reservation.voyage_id = voyage.id AND ";
    if (user_id) searchQuery += " user_id=" + user_id + " AND";
    if (lieu_depart) searchQuery += " lieu_depart=" + lieu_depart + " AND";
    if (lieu_arrive) searchQuery += " lieu_arrive=" + lieu_arrive + " AND";
    if (date_depart) searchQuery += " date_depart=" + date_depart + " AND";
    searchQuery += " 1=1";

    let queryLength =
      "SELECT count(*) as numberOfRow FROM reservation , user , voyage WHERE reservation.user_id = user.id AND reservation.voyage_id = voyage.id AND";
    queryData += searchQuery;
    queryLength += searchQuery;

    order = order ? " ORDER BY " + order : "";
    limit = limit ? limit : 5;
    page = page > 0 ? page * limit : 0;
    queryData += " LIMIT " + limit + " OFFSET " + page + order;
    let reservationsLength = await connexion.query(queryLength, []);
    let reservations = await connexion.query(queryData, []);

    return {
      data: reservations,
      dataLength: reservationsLength[0].numberOfRow,
    };
  } catch (error) {
    throw { message: "something went wrong", status: 403 };
  }
};

exports.getReservation = async (req, res) => {
  try {
    const { id } = req.body;

    let reservation = await connexion.query(
      "SELECT * FROM reservation , user , voyage WHERE reservation.user_id = user.id AND reservation.voyage_id = voyage.id AND reservation.id=?",
      [id]
    );
    return reservation[0];
  } catch (error) {
    throw { message: "something went wrong", status: 403 };
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const { id, status } = req.body;
    await connexion.query("UPDATE reservation SET status=? WHERE id=?", [
      status,
      id,
    ]);
    return;
  } catch (error) {
    throw { message: "something went wrong", status: 403 };
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const { id, date_reservation, heure_reservation, nombre_place } = req.body;
    await connexion.query(
      "UPDATE reservation SET date_reservation=? ,  heure_reservation=? ,nombre_place=?   WHERE id=?",
      [date_reservation, heure_reservation, nombre_place, status, , id]
    );
    return;
  } catch (error) {
    throw { message: "something went wrong", status: 403 };
  }
};
