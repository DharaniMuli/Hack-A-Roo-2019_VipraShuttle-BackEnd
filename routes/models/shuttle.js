const mongoose = require('mongoose');

var shuttleSchema = new mongoose.Schema({
    sname: String,
    location: String,
    currentlocation: String,
    did: String,
    oid: String
});
const shuttledata = mongoose.model('shuttleDetails', shuttleSchema);

module.exports=shuttledata;
