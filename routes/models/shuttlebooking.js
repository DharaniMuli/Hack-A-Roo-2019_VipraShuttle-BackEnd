const mongoose = require('mongoose');

var shuttlebookingSchema = new mongoose.Schema({
    drivername: String,
    shuttlename: String,
    patronname: String,
    pickuplocation: String,
    droplocation: String
});
const shuttlebookingdata = mongoose.model('shuttlebooking', shuttlebookingSchema);

module.exports=shuttlebookingdata;
