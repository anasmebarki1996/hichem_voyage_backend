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
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
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

app.get("/", (req, res) => {
  res.send("hello world");
});
//fin partie bodyParser

// ###################### Routes USER ######################
app.use("/API/user/", require("./routes/user/newsletterRoutes"));
app.use("/API/user/", require("./routes/user/reservationRoutes"));
app.use("/API/user/", require("./routes/user/userRoutes"));
app.use("/API/user/", require("./routes/user/voyageRoutes"));

// ###################### Routes ADMIN ######################
app.use("/API/admin/", require("./routes/admin/voyageRoutes"));
app.use("/API/admin/", require("./routes/admin/newsletterRoutes"));
app.use("/API/admin/", require("./routes/admin/reservationRoutes"));
app.use("/API/admin/", require("./routes/admin/statRoutes"));
app.use("/API/admin/", require("./routes/admin/userRoutes"));
app.use("/API/admin/", require("./routes/admin/adminRoutes"));

// app.all("*", (req, res, next) => {
//   next(new appError(`Can't find ${req.originalUrl} on this server`, 404));
// });

// app.use(globalErrorHandler);

// ###################### FIN Routes ######################

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, process.env.LOCALHOST, function () {
  console.log("Server is running on : " + process.env.LOCALHOST + ":" + PORT);
});
// const server = app.listen(PORT, function () {
//   console.log("Server is running on :" + PORT);
// });

// process.on("unhandledRejection", (err) => {
//   console.log(err.name, err.message);
//   console.log("UNHADLED REJECTION! Shuting down ...");
//   server.close(() => {
//     process.exit(0);
//   });
// });
