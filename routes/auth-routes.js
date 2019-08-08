module.exports = function (app, passport) {

    // Dashboard
    app.get('/user-profile', isLoggedIn, function(req, res) {
        res.render('user-profile');
    });
    
    // Login
    app.get('/login', function(req, res) {
        res.render('login');
    });

    app.post('/login', passport.authenticate('local-signin'),
        function (req, res) {
            res.redirect('/user-profile')
        }
    );

    // Register
    app.get('/register', function(req, res) {
       res.render('register');
    });

    app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/user-profile',
        failureRedirect: '/'
    }
    ));
    
    // Logout
    app.get('/logout', function(req, res) {
        req.session.destroy(function(err) {
            res.redirect('/');
        });
    });


    //* FUNCTIONS
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }
}