const mongoose = require('mongoose');

var bookingSchema = new mongoose.Schema({
    userid: String,
    requesttime: String,
    fromlocation: String,
    tolocation: String,
    driverEmail: String,
});

const bookingdata = mongoose.model('bookings', bookingSchema);

module.exports=bookingdata;
