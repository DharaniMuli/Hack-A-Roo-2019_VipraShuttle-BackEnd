const mongoose = require('mongoose');

var organizationAdminSchema = new mongoose.Schema({
    Firstname: String,
    Lastname: String,
    EmailID: String,
    Password: String,
    Usertype: String,
    OrganizationName: String,
    oid: String
});

const organizationAdmindata = mongoose.model('organizationAdminDetails', organizationAdminSchema);

module.exports=organizationAdmindata;
