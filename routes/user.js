var express = require('express');
var router=express.Router();

var organization=require('../routes/models/organization');
var shuttle=require('../routes/models/shuttle');


router.get('/orgtypes',function (req,res){
    organization.distinct('type',function (err,details) {
      res.json(details);
    });
});

//type in body
router.post('/orgnames',function(req,res){
     organization.find({"type": req.body.type}).distinct('name',function(err,names){
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
            res.status(200).json({message:"success",'Result': 'Organization added successfully'});
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
module.exports = router;

