var db = require("../models");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

module.exports = function(app) {


    // @READ route gets plant name, short desc, and img
    // for displaying all plants to select from
    app.get("/api/plant-short", function(req, res) {
        
        db.Plants.findAll({
            attributes: ["commonName", "shortDesc", "img"]
        }).then(function(results) {
            res.json(results);
        });

    });

    // @READ route orders plants by name
    // used as button with getting all plants ordered ascending
    app.get("/api/plant-short/asc", function(req, res) {
        
        db.Plants.findAll({
            attributes: ["commonName", "shortDesc", "img"],
            order: [["commonName", "ASC"]]
        }).then(function(results) {
            res.json(results);
        });

    });

    // @READ route orders plants by name
    // used as button with getting all plants ordered descending
    app.get("/api/plant-short/desc", function(req, res) {
        
        db.Plants.findAll({
            attributes: ["commonName", "shortDesc", "img"],
            order: [["commonName", "DESC"]]
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

    // @READ route gets all plant data
    app.get("/api/plants", function(req, res) {
        db.Plants.findAll()
        .then(function(result) {
            res.json(result);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    // @READ route gets plant by search term
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

    // @READ route orders plants by name
    // used as button with plants by search term ordered ascending
    app.get("/api/plants/ascend", function(req, res) {
        db.Plants.findAll({
        where: {
            commonName: {
            // $like - does not work
            [Op.substring]: req.body.plantSearch
            }
        },
        order: [["commonName", "ASC"]]
        })
        .then(function(result) {
            res.json(result);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    // @READ route orders plants by name
    // used as button with plants by search term ordered descending 
    app.get("/api/plants/descend", function(req, res) {
        db.Plants.findAll({
        where: {
            commonName: {
            // $like - does not work
            [Op.substring]: req.body.plantSearch
            }
        },
        order: [["commonName", "DESC"]]
        })
        .then(function(result) {
            res.json(result);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

};