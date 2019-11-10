const mongoose = require('mongoose');

var driverSchema = new mongoose.Schema({
    driverName: String,
    driverEmail: String,
    driverPassword: String,
    Usertype: String,
    sid: Number,
    currLat: String,
    currLon: String
});

const driverdata = mongoose.model('driverDetails', driverSchema);

module.exports=driverdata;
