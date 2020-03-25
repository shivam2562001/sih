const express = require('express');
const router = express.Router();
const passport = require('passport');
const crypto = require('crypto');
const async = require('async');
const nodemailer = require('nodemailer');

//Requiring user model
const User = require('../models/usermodel');

// Checks if user is authenticated
function isAuthenticatedUser(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Please Login first to access this page.')
    res.redirect('/login');
  }

//Get routes
router.get('/login', (req,res)=> {
  res.render('login');
});

router.get('/signup', (req,res)=> {
  res.render('signup');
});
router.get('/website',(req,res)=> {
  res.render('website');
});
router.get('/crimeportal', isAuthenticatedUser,(req,res)=> {
  res.render('crimeportal');
});
router.get('/CHILD', isAuthenticatedUser,(req,res)=> {
  res.render('CHILD');
});
router.get('/cyber', isAuthenticatedUser,(req,res)=> {
  res.render('cyber');
});
router.get('/form', isAuthenticatedUser,(req,res)=> {
  res.render('form');
});
router.get('/contactus', isAuthenticatedUser,(req,res)=> {
  res.render('crimeportal');
});
router.get('/womenrelatedcrime',isAuthenticatedUser,(req,res)=> {
  res.render('womenrelatedcrime');
});

router.get('/logout', isAuthenticatedUser,(req, res)=> {
  req.logOut();
  req.flash('success_msg', 'You have been logged out.');
  res.redirect('/login');
});
// post request
router.post('/login', passport.authenticate('local', {
  successRedirect : '/crimeportal',
  failureRedirect : '/login',
  failureFlash: 'Invalid email or password. Try Again!!!'
}));

router.post('/signup', (req, res)=> {
  let {firstname , lastname, email, password} = req.body;

  let userData = {
    firstname : firstname,
    lastname : lastname,
    email :email
  };

  User.register(userData, password, (err, user)=> {
      if(err) {
          req.flash('error_msg', 'ERROR: '+err);
          res.redirect('/signup');
      }
      passport.authenticate('local') (req, res, ()=> {
          req.flash('success_msg', 'Account created successfully');
          res.redirect('/login');
      });
  });

});

module.exports = router;