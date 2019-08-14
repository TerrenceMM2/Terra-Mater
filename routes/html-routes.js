module.exports = function(app) {
  app.get("/", function(req, res) {
    var userData = req.user;

    //Check to see if logged in. If true pass logged in users Data
    if (!userData) {
      console.log("User not logged in");
      res.render('search');
    } else {
      res.render('search', userData);
    }
  });

  app.get("/plant-profile", function(req, res) {
    res.render("plant-profile");
  });

  app.get("/search", function(req, res) {
    res.render("search");
  });
};
