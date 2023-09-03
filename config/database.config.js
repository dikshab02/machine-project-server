const MONGOOSE = require("mongoose");
const MONGODB_URL = "mongodb://127.0.0.1:27017/sample-app";
const CONNECT_MONGO_STORE = require("connect-mongo");
const SESSION = require("express-session");
var MONGODB = process.env.MONGODB_URI || MONGODB_URL;
var DB = MONGOOSE.connection;

MONGOOSE.Promise = global.Promise;
MONGOOSE.connect(MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

DB.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = (APP) => {
  APP.use(
    SESSION({
      secret: "sample-project",
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 3600000, httpOnly: false },
      store: CONNECT_MONGO_STORE.create({
        mongoUrl: MONGODB_URL,
      }),
    })
  );

  require("../models/login").LOGIN;
  require("../models/add-machine").MACHINE;
  require("../models/add-project").PROJECT;
};
