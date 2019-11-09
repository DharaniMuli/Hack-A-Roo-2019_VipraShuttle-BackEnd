const mongoose = require('mongoose');

var organizationAdminSchema = new mongoose.Schema({
    adminName: String,
    adminEmail: String,
    adminPassword: String,
    usertype: String,
    oid: Number
});

const organizationAdmindata = mongoose.model('organizationAdminDetails', organizationAdminSchema);

module.exports=organizationAdmindata;
