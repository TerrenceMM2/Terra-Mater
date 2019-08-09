var db = require("../models");

module.exports = function(app) {

    // @READ route gets all plant data
    app.get("/api/plant", function(req, res) {
        
        db.Plants.findAll({}).then(function(results) {
            res.json(results);
        });
        
    });

    // @READ route gets plant name and short desc
    app.get("/api/plant-short", function(req, res) {
        
        db.Plants.findAll({
            attributes: ["commonName", "shortDesc"]
        }).then(function(results) {
            res.json(results);
        });

    });

    // @READ route gets Plant Profile by ID
    app.get("/api/plant/:id", function(req, res) {
        
        db.Plants.findOne({
            where: {
                plantId: req.params.id
            }
        }).then(function(results) {
            res.json(results);
        });

    });


};  

// for pulling images out of BLOB datatype...
// https://stackoverflow.com/questions/9042327/node-js-reading-blob-from-mysql