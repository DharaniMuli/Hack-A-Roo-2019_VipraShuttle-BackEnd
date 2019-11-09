const mongoose = require('mongoose');

var shuttleSchema = new mongoose.Schema({
    jobid: Number,
    shuttleid: Number,
    userid: Number,
    starttime: String,
    endtime: String
});
const shuttledata = mongoose.model('shuttleDetails', shuttleSchema);

module.exports=shuttledata;
