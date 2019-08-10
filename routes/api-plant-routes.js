var db = require("../models");

module.exports = function (app) {

    app.get("/api/plant", function(req, res) {
        res.json("The plant API works!");
    });

    app.get("api/plant/care/:id", function(req,res){
        if (req.params.db) {
            db.findOne({
              where: {
                routeName: req.params.text
              }
            }).then(function(result) {
              return res.json(result);
            });
          } else {
            db.findAll().then(function(result) {
              return res.json(result);
            });
          }
    })

};  