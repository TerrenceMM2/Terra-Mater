var db = require("../models");

module.exports = function (app) {

    app.get("/api/plant", function(req, res) {
        

        res.json("The plant API works!");
    });

    //Update plant care
    app.put("/api/plant/:id", function(req, res) {
        db.Plant.update({
            text: req.body.text,
            complete: req.body.complete
          }, {
            where: {
              id: req.body.id
            }
          }).then(function(dbPlant) {
            res.json(dbPlant);
          });
        });

};  