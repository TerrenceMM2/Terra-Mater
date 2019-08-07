module.exports = function (app) {

    app.get("/", function (req, res) {
        res.render("index");
    });

    app.get("/register", function (req, res) {
        res.render("register");
    });

    app.get("/user-profile", function (req, res) {
        res.render("user-profile");
    });

    app.get("/plant-profile", function (req, res) {
        res.render("plant-profile");
    });

    app.get("/search", function (req, res) {
        res.render("search");
    });

};