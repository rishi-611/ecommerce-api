const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
const colors = require("colors/safe");

let server;

mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => console.log(colors.blue.bold(`database connected`)))
  .catch((err) => {
    console.log(colors.red.bold("could not connect to database"));
    console.error(err);
  });

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
    return console.log(colors.red.bold("could not start server"));
  }

  console.log(colors.yellow.bold(`server listening on port  ${config.port}`));
});

// ------------- Don't Modify  -------------
const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.log(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  if (server) {
    server.close();
  }
});
// ------------- Don't Modify  -------------
