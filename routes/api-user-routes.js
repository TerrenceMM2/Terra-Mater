var db = require("../models");

module.exports = function (app) {

    app.get("/api/user", function(req, res) {
        res.json("The user API works!");
    });

};