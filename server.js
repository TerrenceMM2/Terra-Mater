var express = require("express");
var exphbs = require("express-handlebars");

// var db = require("./models");

var PORT = process.env.PORT || 8080;

var app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/html-routes.js")(app);
require("./routes/api-user-routes.js")(app);
require("./routes/api-plant-routes.js")(app);

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});

module.exports = app;