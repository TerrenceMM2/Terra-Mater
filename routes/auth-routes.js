/* eslint-disable no-unused-vars */
//! bring in user model?
let db = require('../models');
const bcrypt = require('bcryptjs');

module.exports = function(app, passport) {
   // Dashboard
   app.get('/user-profile', isLoggedIn, function(req, res) {
      res.render('user-profile');
   });

   // Login
   app.get('/login', function(req, res) {
      res.render('login');
   });

   app.post('/login', passport.authenticate('local-signin'), function(
      req,
      res
   ) {
      res.redirect('/user-profile');
   });

   // Register
   app.get('/register', function(req, res) {
      res.render('register');
   });

   // Register Process
   app.post('/register', function(req, res) {
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const email = req.body.email;
      const password = req.body.password;
      const password2 = req.body.password2;

      req.checkBody('firstName', 'First name is required').notEmpty();
      req.checkBody('lastName', 'Last name is required').notEmpty();
      req.checkBody('email', 'Email is required').notEmpty();
      req.checkBody('email', 'Email is not valid').isEmail();
      req.checkBody('password', 'Password is required').notEmpty();
      req.checkBody('password2', 'Passwords do not match').equals(
         req.body.password
      );

      let errors = req.validationErrors();

      if (errors) {
         res.render('register', {
            errors: errors
         });
      } else {
         let newUser = new db.Users({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
         });
        //!  console.log('newUser Object', newUser);

         bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
               if (err) {
                  console.log(err);
               }
               newUser.password = hash;
               newUser.save()
                .then(() => {
                  res.status(200).json({
                    success: true
                  });
                })
                .catch(error => {
                  console.log('error in bcrypt');
                  console.log(error);
                  res.status(500).json({
                    error: error,
                    success: false,
                    msg: "Account could not be created."
                  })
                });
            });
         });
      }
   });
   // app.post(
   //   "/register",
   //   passport.authenticate("local-signup", {
   //     successRedirect: "/user-profile",
   //     failureRedirect: "/"
   //   })
   // );

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
