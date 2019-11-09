var express = require('express');
var router=express.Router();
var signup = require('../routes/models/signup.js');




router.post('/signupDetails', function (req, res, next) {
    console.log(req.body);
    signup.find({EmailID: req.body.EmailID}, function (err, data) {
        if (data.length <= 0) {
            if (req.body.EmailID !== null && req.body.Password !== null) {
                console.log(req.body);
                signup.create(req.body, function (err, post) {
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
    signup.find({EmailID: req.body.userid}, function(err,data) {
        //console.log(data);
        res.json(data);
    });
});



router.post('/signinDetails' ,function(req,res,next) {
    //console.log(req.body);
    signup.find({'EmailID': req.body.EmailID}, function (err, user) {
        //  console.log(user);
        if (user.length <= 0){
            res.json('no user available register to login');
        }else{
            if(user[0]) {
                if (user[0].Password === req.body.Password) {

                    res.json("Success");
                }else {
                    res.json("incorrect password")
                }
            }
        }
    });
});





module.exports = router;