var express = require('express');
var router=express.Router();

var organization=require('../routes/models/organization');
var shuttle=require('../routes/models/shuttle');

var organizationAdmin=require('../routes/models/organizationAdmin');
var driver=require('../routes/models/driver');
var shuttle = require('../routes/models/shuttle');


router.post('/orgname',function(req,res){
   organization.find({"_id":req.body}).distinct("name",function (err,data) {
       return res.json(data);
   });
});




router.get('/getOrgNames',function (req,res){
    organization.distinct('name',function (err,details) {
        res.json(details);
    });
});


router.get('/orgtypes',function (req,res){
    organization.distinct('type',function (err,details) {
      res.json(details);
    });
});

//type in body
router.post('/orgnam',function(req,res){

    console.log('this is 1 st call');
    console.log('org name',req.body);
     organization.find({"_id": Object(req.body)}).distinct('name',function(err,names){
         res.json(names);
     });
});
//req.body.name in post request
router.post('/fromlocation',function(req,res){
    organization.find({"name":req.body.name}).distinct('address',function(err,output2){
     organization.find({"name": req.body.name}).distinct('_id',function (err,output) {
         shuttle.find({"oid":output}).distinct('location',function (err,output1) {
             output1.push(output2.toString());
             res.json(output1);
         });
         });
    });
});

router.post('/register', function (req, res, next) {
    let Organ = new organization(req.body);
    console.log(Organ);
    organization.create(Organ)
        .then(organ => {
            res.status(200).json({message:"success",'Result': 'Added successfully'});
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({message:err});
        });
});



router.post('/AddOrganizationAdmin', function (req, res, next) {
    let organAdmin = new organizationAdmin(req.body);
    console.log(organAdmin);
    organizationAdmin.create(organAdmin)
        .then(organAdmin => {
            res.status(200).json({message:"success",'Result': 'Admin had been added successfully'});
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({message:err});
        });
});

router.post('/createDriver', function (req, res, next) {
    let Driver = new driver(req.body);
    console.log(Driver);
    driver.create(Driver)
        .then(Driver => {
            res.status(200).json({message:"success",'Result': 'Driver had been added successfully'});
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({message:err});
        });
});




router.post('/AddShuttle', function (req, res, next) {
    let Shuttle = new shuttle(req.body);
    console.log(Shuttle);
    shuttle.create(Shuttle)
        .then(Shuttle => {
            res.status(200).json({message:"success",'Result': 'Driver had been added successfully'});
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({message:err});
        });
});

// Get all accounts
router.route('/getallAccounts').get(function (req, res, next) {
    console.log('in backend route page');
    organization.find(function (err, account) {
        if (err) return next(err);
        res.json(account);
    });
});

router.route('/getallAdminUsers').get(function (req, res, next) {
    console.log('in backend route page');
    organizationAdmin.find({ "Usertype" : "OrganizationAdmin"},function (err, account) {
        if (err) return next(err);
        res.json(account);
    });
});


router.route('/getAllDrivers').get(function (req, res, next) {
    console.log('in backend route page');
    driver.find({ "Usertype" : "Driver"},function (err, account) {
        if (err) return next(err);
        res.json(account);
    });
});


router.post('/getDrivers',function (req, res) {
    console.log('get drivers');
    console.log(req.body);
    driver.find({"OrganizationName": req.body.type}, function (err, account) {
        if (err) return next(err);
        res.json(account);
    });
})



router.route('/getAllShuttles').get(function (req, res, next) {
    console.log('in backend route page');
    shuttle.find(function (err, shuttle) {
        if (err) return next(err);
        res.json(shuttle);
    });
});

module.exports = router;

