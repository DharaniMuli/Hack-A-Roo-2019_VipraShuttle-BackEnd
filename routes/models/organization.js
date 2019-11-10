const mongoose = require('mongoose');

var organizationSchema = new mongoose.Schema({
    name:  String,
    type: String,
    address: String,
});

const organizationdata = mongoose.model('organizationDetails', organizationSchema);

module.exports=organizationdata;
