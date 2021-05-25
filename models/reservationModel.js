var connexion = require("./../config/db");

exports.createReservation = async (req, res) => {
  try {
    const { nombre_place, voyage_id, user_id } = req.body;

    console.log("user_id");
    console.log(user_id);
    console.log("nombre_place");
    console.log(nombre_place);

    let place_restante = await connexion.query(
      "SELECT (voyage.max_place - COALESCE(SUM(nombre_place), 0)) as place_restante FROM voyage LEFT JOIN reservation ON reservation.voyage_id = voyage.id WHERE voyage.id=? GROUP BY voyage.id",
      [voyage_id]
    );

    if (!place_restante.length) {
      throw { message: "voyage non disponible", status: 403 };
    }
    if (place_restante[0].place_restante >= nombre_place) {
      await connexion.query(
        "INSERT INTO reservation (date_reservation,heure_reservation,nombre_place,status,voyage_id,user_id) VALUES (CURRENT_DATE,CURRENT_TIME,?,'active',?,?)",
        [nombre_place, voyage_id, user_id]
      );
      return;
    } else throw { message: "il ne reste pas assez de place ", status: 403 };
  } catch (error) {
    console.log(error);
    if (error.message) throw { message: error.message, status: error.status };
    else throw { message: "something went wrong", status: 400 };
  }
};

// current_date() , CURRENT_TIME()

exports.getAllReservations = async (req, res) => {
  try {
    let { user_id, lieu_depart, lieu_arrive, date_depart, limit, page, order } =
      req.body;
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
    queryData += order + " LIMIT " + limit + " OFFSET " + page;
    let reservationsLength = await connexion.query(queryLength, []);
    let reservations = await connexion.query(queryData, []);

    return {
      data: reservations,
      dataLength: reservationsLength[0].numberOfRow,
    };
  } catch (error) {
    console.log(error);
    throw { message: "something went wrong", status: 400 };
  }
};

exports.getReservation = async (req, res) => {
  try {
    const { id } = req.body;

    let reservation = await connexion.query(
      "SELECT  user.nom as user_name, user.prenom as user_prenom ,user.date_naissance as user_date_naissance, user.email as user_email ,user.adresse as user_adresse ,  user.num_tel as user_num_tel , prix , duree , date_reservation,heure_reservation ,nombre_place ,status , moyen_transport, date_depart , heure_depart , lieu_depart , lieu_arrive ,voyage.id ,max_place, agence.nom as agence_nom , agence.adresse as agence_adresse FROM reservation , user , voyage , agence WHERE reservation.user_id = user.id AND reservation.voyage_id = voyage.id AND voyage.agence_id = agence.id AND reservation.id=?",
      [id]
    );
    return reservation[0];
  } catch (error) {
    throw { message: "something went wrong", status: 400 };
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
    throw { message: "something went wrong", status: 400 };
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
    throw { message: "something went wrong", status: 400 };
  }
};
