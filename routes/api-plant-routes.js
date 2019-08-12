var db = require("../models");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

module.exports = function(app) {
    app.get("/api/plants", function(req, res) {
        db.Plants.findAll()
        .then(function(result) {
            res.json(result);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    app.get("/api/plant", function(req, res) {
        res.json("The plant API works!");
    });

    //Update plant care
    // app.put("/api/plant/:id", function(req, res) {
    //     db.Plant.update({
    //         text: req.body.text,
    //         complete: req.body.complete
    //       }, {
    //         where: {
    //           id: req.body.id
    //         }
    //       }).then(function(dbPlant) {
    //         res.json(dbPlant);
    //       });
    //     });
    
    app.get("/api/plants/search", function(req, res) {
        db.Plants.findAll({
        where: {
            commonName: {
            // $like - does not work
            [Op.substring]: req.body.plantSearch
            }
        }
        })
        .then(function(result) {
            res.json(result);
        })
        .catch(function(err) {
            res.json(err);
        });
    });
};  
  

