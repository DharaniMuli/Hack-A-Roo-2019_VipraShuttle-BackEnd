const mongoose = require('mongoose');

var driverSchema = new mongoose.Schema({
    Firstname: String,
    Lastname: String,
    EmailID: String,
    Password: String,
    Usertype: String,
    sid: Number,
    currLat: String,
    currLon: String
});

const driverdata = mongoose.model('driverDetails', driverSchema);

module.exports=driverdata;
