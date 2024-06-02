const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/my_database');

const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("connected to mongo ...");
});

module.exports = db;