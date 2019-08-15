var express = require("express");
var exphbs = require("express-handlebars");

var app = express();
var PORT = process.env.PORT || 8080;

var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");

require("dotenv").config();

var expressValidator = require("express-validator");

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//For passport
app.use(
  session({
    secret: "process.env.SECRET_KEY",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Setup Misc
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Setup Express Validator Middleware
app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      var namespace = param.split(".");
      (root = namespace.shift()), (formParam = root);

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);

// Setup Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Define Models
var db = require("./models");

// Define Routes
require("./routes/auth-routes.js")(app, passport);
require("./routes/html-routes.js")(app);
require("./routes/api-user-routes.js")(app);
require("./routes/api-plant-routes.js")(app);

//Load passport strategies
var db = require("./models");
require("./config/passport.js")(passport, db.Users);

// Views
app.set("views", "./views");

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
