var connexion = require("../config/db");

exports.stat = async (req) => {
  try {
    let nombreStat = await connexion.query(
      "SELECT (SELECT count(*) as nombre FROM user ) as nombreUser , (SELECT COUNT(*) from voyage ) as nombreVoyage , (SELECT COUNT(*) from newsletter ) as nombreNewsletter , (SELECT COUNT(*) from reservation ) as nombreReservation",
      []
    );

    let voyageMostReserved = await connexion.query(
      "SELECT voyage.lieu_depart, voyage.lieu_arrive, SUM(reservation.nombre_place) as nombre FROM reservation INNER JOIN voyage ON reservation.voyage_id = voyage.id GROUP BY voyage.lieu_depart, voyage.lieu_arrive ORDER BY nombre DESC LIMIT 5"
    );
    let voyageMostExist = await connexion.query(
      "SELECT lieu_depart,lieu_arrive, count(*) as nombre FROM voyage GROUP BY lieu_depart,lieu_arrive  ORDER BY nombre DESC LIMIT 5"
    );

    let userMostReserved = await connexion.query(
      "SELECT nom, prenom , email, COUNT(*) as nombre FROM user INNER JOIN reservation ON user.id= reservation.user_id GROUP BY user.id ORDER BY nombre DESC LIMIT 5"
    );

    let villeMostVisited = await connexion.query(
      "SELECT lieu_arrive , COUNT(*) as nombre FROM voyage INNER JOIN reservation ON voyage.id = reservation.voyage_id GROUP BY voyage.lieu_arrive ORDER BY nombre DESC LIMIT 5"
    );

    let moyenTransportMostUsed = await connexion.query(
      "SELECT moyen_transport , count(*) as nombre FROM voyage LEFT JOIN reservation ON voyage.id = reservation.voyage_id GROUP BY moyen_transport"
    );

    let dataMoyenTransport = [0, 0, 0, 0];
    let i = 0;
    moyenTransportMostUsed.forEach((element) => {
      if (element.moyen_transport === "avion")
        dataMoyenTransport[0] = element.nombre;
      if (element.moyen_transport === "bus")
        dataMoyenTransport[1] = element.nombre;
      else if (element.moyen_transport === "taxi")
        dataMoyenTransport[2] = element.nombre;
      else dataMoyenTransport[3] = element.nombre;
      i++;
    });

    let reservationsPerMonth = await connexion.query(
      "SELECT MONTH(`date_reservation`) AS month, SUM(nombre_place) AS nombre FROM reservation WHERE YEAR(date_reservation) = YEAR(CURDATE()) GROUP BY MONTH(`date_reservation`) "
    );

    let dataChart = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    reservationsPerMonth.forEach((element) => {
      dataChart[element.month - 1] = element.nombre;
    });

    return {
      nombreStat: nombreStat[0],
      voyageMostReserved: voyageMostReserved,
      voyageMostExist: voyageMostExist,
      userMostReserved: userMostReserved,
      villeMostVisited: villeMostVisited,
      moyenTransportMostUsed: dataMoyenTransport,
      reservationsPerMonth: dataChart,
    };
  } catch (error) {
    throw { message: "something went wrong", status: 401 };
  }
};
