module.exports = function(app) {
  app.get("/", function(req, res) {
    var userData = req.user;

    if (!userData) {
      console.log("User not logged in");
      res.render("index");
    } else {
      res.render("index", userData);
    }
  });

  app.get("/register", function(req, res) {
    res.render("register");
  });

  app.get("/plant-profile", function(req, res) {
    res.render("plant-profile");
  });

  app.get("/search", function(req, res) {
    res.render("search");
  });
};
