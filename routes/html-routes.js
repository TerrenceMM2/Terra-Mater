module.exports = function(app) {
  app.get("/", function(req, res) {
    // Logged in user data, else is undefined
    var userData = req.user;

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
