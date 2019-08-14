module.exports = function(app) {
  app.get("/", function(req, res) {
    var userData = req.user;

    if (!userData) {
      console.log("User not logged in");
      res.locals.metaTags = {
        title: "Terra Mater"
      }
      res.render("search", userData);
    } else {
      res.locals.metaTags = {
        title: "Terra Mater"
      }
      res.render("search", userData);
    }
  });

  app.get("/register", function(req, res) {
    res.locals.metaTags = {
      title: "Terra Mater | Register"
    }
    res.render("register");
  });

  app.get("/plant-profile", function(req, res) {
    res.render("plant-profile");
  });
};
