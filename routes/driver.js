var express = require('express');
var router=express.Router();
var driver=require('../routes/models/driver.js');
var shuttle=require('../routes/models/shuttle.js');


router.get('/getAll', function (req, res, next) {
    console.log("hai");
    driver.find(function (err, data) {
        console.log(data);
        if (err) console.log(err);
        res.json(data);
    });

});

router.post('/signupDetails', function (req, res, next) {
    console.log(req.body);
    driver.find({driverEmail: req.body.driverEmail}, function (err, data) {
        if (data.length <= 0) {
            if (req.body.driverEmail !== null && req.body.driverPassword !== null) {
                console.log(req.body);
                driver.create(req.body, function (err, post) {
                    if (err) return next(err);
                    res.json(post);
                });
            } else {
                res.json("Please fill the details");
            }
        } else {
            res.json("User exists");
        }
    });
});




router.post('/profiledetails',function(req,res) {
    driver.find({driverEmail: req.body.userid}, function(err,data) {
        //console.log(data);
        res.json(data);
    });
});



router.post('/signinDetails' ,function(req,res,next) {
    //console.log(req.body);
    driver.find({driverEmail: req.body.driverEmail}, function (err, user) {
        //  console.log(user);
        if (user.length <= 0){
            res.json('no user available register to login');
        }else{
            if(user[0]) {
                if (user[0].driverPassword === req.body.driverPassword) {

                    res.json({message: "Success", user: user});
                }else {
                    res.json({message:"Invalid credentials"})
                }
            }
        }
    });
});

router.put('/updateLocation', function (req, res, next) {
    console.log("details " + req.body.currLat + ' ' + req.body.currLon)
    driver.update({driverEmail: req.body.driverEmail}, { $set: {'currLat': req.body.currLat} }, { $set: {'currLon': req.body.currLon} }, function (err,post){
        if (err) return next(err);
        res.json(post);
    })
});


module.exports = router;

