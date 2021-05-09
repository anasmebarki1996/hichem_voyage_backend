const express = require("express");
const app = express();
const morgan = require("morgan");
var bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
// const appError = require("./utils/appError");
// const globalErrorHandler = require("./controllers/errorController");

// process.on("uncaughtException", (err) => {
//   console.log(err.name, err.message);
//   console.log("UNHADLED REJECTION! Shuting down ...");
//   process.exit(0);
// });

require("./config/db");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(morgan("dev"));

app.use(express.static("public"));
//partie bodyParser
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
//fin partie bodyParser
const userRoutes = require("./routes/userRoutes");
const voyageRoutes = require("./routes/voyageRoutes");
const reservationRoute = require("./routes/reservationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const agencesRoutes = require("./routes/agencesRoutes");
// ###################### Routes USER ######################
app.use("/API/user/", userRoutes);
app.use("/API/user/", voyageRoutes);
app.use("/API/user/", reservationRoute);

// ###################### Routes ADMIN ######################
app.use("/API/admin/", userRoutes);
app.use("/API/admin/", adminRoutes);
app.use("/API/admin/", voyageRoutes);
app.use("/API/admin/", reservationRoute);
app.use("/API/admin/", agencesRoutes);

// app.all("*", (req, res, next) => {
//   next(new appError(`Can't find ${req.originalUrl} on this server`, 404));
// });

// app.use(globalErrorHandler);

// ###################### FIN Routes ######################

const PORT = process.env.PORT || 30001;
const server = app.listen(PORT, process.env.LOCALHOST, function () {
  console.log("Server is running on : " + process.env.LOCALHOST + ":" + PORT);
});

// process.on("unhandledRejection", (err) => {
//   console.log(err.name, err.message);
//   console.log("UNHADLED REJECTION! Shuting down ...");
//   server.close(() => {
//     process.exit(0);
//   });
// });
