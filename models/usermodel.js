const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

let userScheme = new mongoose.Schema({
  firstname : String,
  lastname : String,
  email : String,
  password : {
    type : String,
    select : false
},
resetPasswordToken : String,
resetPasswordExpires : Date
});

userScheme.plugin(passportLocalMongoose, {usernameField : 'email'});
module.exports = mongoose.model('User', userScheme);