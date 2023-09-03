require("dotenv").config();
const EXPRESS = require("express");
const APP = EXPRESS();
const CORS = require("cors");
const PORT = 3300;

APP.use(EXPRESS.json());
APP.use(EXPRESS.urlencoded({ extended: true }));
APP.use(
  CORS({
    origin: ["http://localhost:4200", "http://127.0.0.1:4200"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

require("./config/database.config")(APP);
require("./routes/login.route")(APP);
require("./routes/add-machine.route")(APP);
require("./routes/add-project.route")(APP);

APP.listen(PORT, function () {
  console.log("Port " + PORT + " is connected");
});
