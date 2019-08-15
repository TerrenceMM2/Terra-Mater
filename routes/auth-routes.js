var db = require('../models');
var bcrypt = require('bcryptjs');

module.exports = function(app, passport) {
   // Dashboard
   app.get('/user-profile', isLoggedIn, function(req, res) {
      // req.user is passed from passport once user logs in
      userData = req.user
      res.render('user-profile', userData);
   });

   // Login
   app.get('/login', function(req, res) {
      res.render('login');
   });

  //  Login proccess
   app.post('/login', passport.authenticate('local-signin'), function(req, res) {
      res.status(200).json({
         success: true
      });
   });

   // Register
   app.get('/register', function(req, res) {
      res.locals.metaTags = {
         title: "Register"
       }
      res.render('register');
   });

   // Register Process
   app.post('/register', function(req, res) {
      var firstName = req.body.firstName;
      var lastName = req.body.lastName;
      var email = req.body.email;
      var password = req.body.password;
      var password2 = req.body.password2;

      // Validate reg data and make sure they pass
      req.checkBody('firstName', 'First name is required').notEmpty();
      req.checkBody('lastName', 'Last name is required').notEmpty();
      req.checkBody('email', 'Email is required').notEmpty();
      req.checkBody('email', 'Email is not valid').isEmail();
      req.checkBody('password', 'Password is required').notEmpty();
      req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

      var formErrors = req.validationErrors();

      if (formErrors) {
         res.status(400).json({
           formErrors: formErrors,
           type: "formError"
        });
      } else {
         // if all checks pass, assign reg data to model object
         let newUser = new db.Users({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
         });

         // encrypt psw
         bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
               if (err) {
                  console.log(err);
               }
               newUser.password = hash;

               // Save reg data to Database
               newUser.save()
                .then(() => {
                  res.status(200).json({
                    success: true
                  });
                })
                .catch(error => {
                  console.log(error);
                  res.status(500).json({
                    error,
                    success: false,
                    type: "dbError",
                    msg: "Account could not be created. Please try again"
                  })
                });
            });
         });
      }
   });

   // Logout
   app.get('/logout', function(req, res) {
      req.session.destroy(function(err) {
         res.redirect('/');
      });
   });


   //* FUNCTIONS
   function isLoggedIn(req, res, next) {
      if (req.isAuthenticated()) {
         return next();
      }
      res.redirect('/');
   }
};
