var db = require("../models");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

module.exports = function(app) {

// =============================================
// all plants directory including ==============
// sorting buttons area ========================
// =============================================

    // @READ route gets plant name, short desc, and img
    // for displaying all plants to select from
    app.get("/api/plant-short", function(req, res) {
        
        db.Plants.findAll({}).then(function(result) {
            res.locals.metaTags = {
                title: "All Plants"
            };
            res.status(200).render("plantdir", { Plants: result, loggedIn: req.isAuthenticated() });
        });

    });

    // @READ route orders plants by name
    // used as button with getting all plants ordered ascending
    app.get("/api/plant-short/asc", function(req, res) {
        
        db.Plants.findAll({
            order: [["commonName", "ASC"]]
        }).then(function(results) {
            res.locals.metaTags = {
                title: "All Plants - Ascending"
            };
            res.status(200).render("plantdir", { Plants: results, loggedIn: req.isAuthenticated() });
        });

    });

    // @READ route orders plants by name
    // used as button with getting all plants ordered descending
    app.get("/api/plant-short/desc", function(req, res) {
        
        db.Plants.findAll({
            order: [["commonName", "DESC"]]
        }).then(function(results) {
            res.locals.metaTags = {
                title: "All Plants - Descending"
            };
            res.status(200).render("plantdir", { 
                Plants: results, 
                loggedIn: req.isAuthenticated() 
            });
        });

    });


// =============================================
// favorites button ============================
// =============================================

    // @POST route to add user favorite to table
    app.post("/api/add-favorite", function(req, res) {
        // console.log(req.body);        
        db.Favorites.create({
            plantId: req.body.plantId,
            commonName: req.body.commonName,
            UserId: req.body.Userid
        }).then(function(){
            res.status(200)
        });
    });


// =============================================
// get plant profile by id =====================
// =============================================

    // @READ route gets Plant Profile by ID
    app.get("/plant/:id", function(req, res) {
        var userData = req.user;
        
        db.Plants.findOne({
            where: {
                plantId: req.params.id
            }
        }).then(function(results) {
            console.log(results);
            res.locals.metaTags = {
                title: results.dataValues.commonName
              }
            res.render("plant-profile", { 
                data: results.dataValues,
                user: userData,
                loggedIn: req.isAuthenticated()
            });
        });

    });

// =============================================
// search via term including ===================
// sorting buttons area ========================
// =============================================

    // @READ route gets plant by search term
    app.get("/plants/search/:term", function(req, res) {
        db.Plants.findAll({
        where: {
            commonName: {
            [Op.substring]: req.params.term
            }
        }
        })
        .then(function(results) {
            res.locals.metaTags = {
                title: req.params.term + " - Search Results"
              };
            res.status(200).render("searchresults", { Plants: results, loggedIn: req.isAuthenticated()});
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    // @READ route orders plants by name
    // used as button with plants by search term ordered ascending
    app.get("/plants/search/sort-asc/:term", function(req, res) {
        db.Plants.findAll({
        where: {
            commonName: {
            [Op.substring]: req.params.term
            }
        },
        order: [["commonName", "ASC"]]
        })
        .then(function(results) {
            res.locals.metaTags = {
                title: req.params.term + " - Search Results - Ascending"
              };
            res.status(200).render("searchresults", { Plants: results, loggedIn: req.isAuthenticated() });
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    // @READ route orders plants by name
    // used as button with plants by search term ordered descending 
    app.get("/plants/search/sort-desc/:term", function(req, res) {
        db.Plants.findAll({
        where: {
            commonName: {
            [Op.substring]: req.params.term
            }
        },
        order: [["commonName", "DESC"]]
        })
        .then(function(results) {
            res.locals.metaTags = {
                title: req.params.term + " - Search Results - Descending"
              };
             res.status(200).render("searchresults", { Plants: results, loggedIn: req.isAuthenticated() });
        })
        .catch(function(err) {
            res.json(err);
        });
    });

};
