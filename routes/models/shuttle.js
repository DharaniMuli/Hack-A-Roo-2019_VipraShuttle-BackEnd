const mongoose = require('mongoose');

var shuttleSchema = new mongoose.Schema({
    sId: Number,
    sname: String,
    location: String,
    oid: Number
});
const shuttledata = mongoose.model('shuttleDetails', shuttleSchema);

module.exports=shuttledata;
