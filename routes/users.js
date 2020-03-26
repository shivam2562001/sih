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
  res.render('contactus');
});

router.get('/Blog', isAuthenticatedUser,(req,res)=> {
  res.render('Blog');
});
router.get('/About', isAuthenticatedUser,(req,res)=> {
  res.render('About');
});
router.get('/womenrelatedcrime',isAuthenticatedUser,(req,res)=> {
  res.render('womenrelatedcrime');
});

router.get('/logout', isAuthenticatedUser,(req, res)=> {
  req.logOut();
  req.flash('success_msg', 'You have been logged out.');
  res.redirect('/login');
});
router.get('/password/change', isAuthenticatedUser, (req, res)=> {
  res.render('changepassword');
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

router.post('/password/change', (req, res)=> {
  if(req.body.password !== req.body.confirmpassword) {
      req.flash('error_msg', "Password don't match. Type again!");
      return res.redirect('/password/change');
  }

  User.findOne({email : req.user.email})
      .then(user => {
          user.setPassword(req.body.password, err=>{
              user.save()
                  .then(user => {
                      req.flash('success_msg', 'Password changed successfully.');
                      res.redirect('/password/change');
                  })
                  .catch(err => {
                      req.flash('error_msg', 'ERROR: '+err);
                      res.redirect('/password/change');
                  });
          });
      });
});




module.exports = router;