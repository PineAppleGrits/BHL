/* Require mongooose */
const mongoose = require("mongoose");

/* Database URI */
const { MONGO_URI } = process.env;

/* Database connection */
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((db) =>
    console.log("[MongoDB] database is [online] [\u2713]")
  )
  .catch((error) => console.error(error));