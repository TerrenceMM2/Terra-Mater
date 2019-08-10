var db = require("../models");

module.exports = function (app) {

    app.get("/api/plant", function(req, res) {
        

        res.json("The plant API works!");
    });

};  