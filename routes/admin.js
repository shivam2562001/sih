const express = require('express');
const router = express.Router();
//requiring model
let Report = require('../models/reportmodel');
function isAuthenticatedUser(req, res, next) {
  if(req.isAuthenticated()) {
      return next();
  }
  req.flash('error_msg', 'Please Login first to access this page.')
  res.redirect('/login');
}
/*router.get("/report",isAuthenticatedUser,(req,res)=>{
   res.render("report");
});*/
router.get('/crimeportal', isAuthenticatedUser,(req,res)=> {
  res.render('crimeportal');
});
router.get('/report', isAuthenticatedUser,(req,res)=> {
  Report.find({})
  .then(reports => {
    res.render('report',{reports : reports});
  })
  .catch(err=>{
    res.redirect("/crimeportal");
  })
});

//router.get("/form",isAuthenticatedUser,(req,res)=>{
 // res.render("form");
//});
//post request
router.post('/report',isAuthenticatedUser,(req, res)=> {
   /*{name, gender, email, phonecode, phone, address, complaint, place,time}*///let reportdata = new Report(req.body);

 let reportdata = {
      name : req.body.name,
      gender : req.body.gender,
      email : req.body.email,
      phonecode : req.body.phonecode,
      phone : req.body.phone,
      address : req.body.address,
      complaint : req.body.complaint,
      place : req.body.place,
      time : req.body.time
  };
  Report.create(reportdata)
      .then(report => {
        req.flash('success_msg', 'Report Registered Successfully');
        res.redirect('/crimeportal');
      })
      .catch(err => {
        req.flash('error_msg', 'ERROR: '+err)
        res.redirect('/crimeportal');
    });
    
});    


module.exports = router;