module.exports = function(app) {
  app.get("/", function(req, res) {
    var userData = req.user;
    //Check to see if logged in. If true pass logged in users Data
    res.locals.metaTags = {
      title: "Terra Mater"
    };
    res.render("search", {
      user: userData,
      loggedIn: req.isAuthenticated()
    });
  });

  app.get("/register", function(req, res) {
    res.locals.metaTags = {
      title: "Terra Mater | Register"
    };
    res.render("register");
  });
};