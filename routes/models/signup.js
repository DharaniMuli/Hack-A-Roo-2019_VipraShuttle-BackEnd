const mongoose = require('mongoose');

var signupSchema = new mongoose.Schema({
    Firstname: String,
    Lastname: String,
    EmailID:  String,
    Password: String,
    Usertype: String
    });
const signupdata = mongoose.model('signupDetails', signupSchema);

module.exports=signupdata;
