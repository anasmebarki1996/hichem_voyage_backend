var connexion = require("../config/db");

exports.createVoyage = async (req, res) => {
  const {
    lieu_depart,
    lieu_arrive,
    date_depart,
    heure_depart,
    duree,
    prix,
    max_place,
    moyen_transport,
    agence_id,
  } = req.body;

  try {
    await connexion.query(
      "INSERT INTO voyage (lieu_depart,lieu_arrive,date_depart,heure_depart,duree,prix,max_place ,moyen_transport, agence_id ) VALUES (?,?,?,?,?,?,?,?,?)",
      [
        lieu_depart,
        lieu_arrive,
        date_depart,
        heure_depart,
        duree,
        prix,
        max_place,
        moyen_transport,
        agence_id,
      ]
    );
    return;
  } catch (error) {
    throw { message: "something went wrong", status: 403 };
  }
};
exports.getVoyage = async (req) => {
  const { id } = req.body;

  console.log(req.body);
  let voyage = await connexion.query("SELECT * FROM voyage WHERE id=?", [id]);

  return { data: voyage[0] };
};

exports.getAllVoyages = async (req, res) => {
  try {
    let {
      user_id,
      lieu_depart,
      lieu_arrive,
      date_depart,
      moyen_transport,
      limit,
      page,
      order,
    } = req.body;

    let queryLength = "";
    let queryData =
      "select moyen_transport, date_depart , heure_depart , lieu_depart , duree , prix,  lieu_arrive ,voyage.id , COUNT(reservation.id) as nombre_reservation ,SUM(reservation.nombre_place) as place_reserve ,max_place FROM voyage LEFT JOIN reservation on voyage.id = reservation.voyage_id WHERE";
    if (user_id) queryData += " user_id=" + user_id + " AND";
    if (lieu_depart)
      queryData += " lieu_depart LIKE '%" + lieu_depart + "%' AND";
    if (moyen_transport)
      queryData += " moyen_transport='" + moyen_transport + "' AND";
    if (lieu_arrive)
      queryData += " lieu_arrive LIKE '%" + lieu_arrive + "%' AND";
    if (date_depart) queryData += " date_depart=" + date_depart + " AND";
    queryData += " 1 GROUP BY voyage.id ";

    queryLength =
      "SELECT count(*) as numberOfRow FROM ( " +
      queryData +
      " )AS DerivedTableAlias";

    order = order ? " ORDER BY " + order : "";
    limit = limit ? limit : 5;
    console.log(limit);
    page = page > 0 ? page * limit : 0;
    queryData += order + " LIMIT " + limit + " OFFSET " + page;

    let voyagesLength = await connexion.query(queryLength, []);

    let voyages = await connexion.query(queryData, []);

    return { data: voyages, dataLength: voyagesLength[0].numberOfRow };
  } catch (error) {
    console.log(error);
    throw { message: "something went wrong", status: 403 };
  }
};

exports.deleteVoyage = async (req, res) => {
  const { voyage_id } = req.body;
  try {
    await connexion.query("DELETE FROM reservation WHERE voyage_id=?", [
      voyage_id,
    ]);
    await connexion.query("DELETE FROM voyage WHERE id=?", [voyage_id]);
    return;
  } catch (error) {
    throw { message: "something went wrong", status: 403 };
  }
};

exports.updateVoyage = async (req, res) => {
  const {
    voyage_id,
    lieu_depart,
    lieu_arrive,
    date_depart,
    heure_depart,
    duree,
    prix,
    max_place,
    moyen_transport,
    agence_id,
  } = req.body;

  try {
    await connexion.query(
      "UPDATE voyage SET lieu_depart=? ,lieu_arrive=? ,date_depart=? ,heure_depart=? ,duree=? ,prix=? ,max_place=? ,moyen_transport=? ,agence_id=? WHERE id=?",
      [
        lieu_depart,
        lieu_arrive,
        date_depart,
        heure_depart,
        duree,
        prix,
        max_place,
        moyen_transport,
        agence_id,
        voyage_id,
      ]
    );
    return;
  } catch (error) {
    throw { message: "something went wrong", status: 403 };
  }
};
