const mongoose = require('mongoose');

var driverSchema = new mongoose.Schema({
    driverName: String,
    driverEmail: String,
    driverPassword: String,
    usertype: String,
    sid: Number
});

const driverdata = mongoose.model('driverDetails', driverSchema);

module.exports=driverdata;
