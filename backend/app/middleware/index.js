const bodyParser = require("body-parser");
const cors = require("cors");
const {
  EXPRESS_SECRET,
} = require("../config/env");
const passportJwtUtils = require("./passportJwtUtils");
const passport = require("passport");
var session = require("express-session");

class Middleware {
  init(app) {
    app.set("PORT", process.env.PORT || 5000);
    app.use(cors());
    app.use(bodyParser.json({ limit: "20mb" }));
    app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }));

    /**
     * Passport middleware init
     */
    app.use(
      session({
        secret: EXPRESS_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true },
      })
    );

    app.use(passport.initialize());
    app.use(passport.session());
    /**
     * Passport strategy
     */
    passportJwtUtils(passport);
  }
}

const middlewareObj = new Middleware();
module.exports = middlewareObj;
