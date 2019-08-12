var db = require("../models");

module.exports = function(app) {
  app.get("/api/user", function(req, res) {
    res.json("The user API works!");
  });

  //get all users
  app.get("/api/user/all", function(req, res){
    db.Users.findAll({})
    .then(function(result){
      res.json(result);
    }).catch(function(err) {
      res.json(err);
    });
  })

  //sign-in user
  app.get("/api/user/:id", function(req, res) {
    db.Users.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
        res.json(err);
    });
  })

  //edit user details
  app.put("/api/user/:id", function(req, res){
    db.Users.update({
      text: req.body.text
    }, {
      where: {
        id: req.body.id
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
