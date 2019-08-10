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

  //get specific user
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

  //create new user
  // app.post("/api/user/:id", function(req,res){
  //   db.User.create({
  //     text: req.body.text,
    
  //   })
  // })


  //sign-in user


  //edit user details
  
};
