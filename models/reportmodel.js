const mongoose = require('mongoose');

let reportscheme = new mongoose.Schema({
  name : String,
  gender : String,
  email : String,
  phonecode : String,
  phone : String,
  address : String,
  complaint : String,
  place : String,
  time : String
});
module.exports = mongoose.model('Report', reportscheme);