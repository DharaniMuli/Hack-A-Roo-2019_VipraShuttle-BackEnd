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


module.exports = router;

