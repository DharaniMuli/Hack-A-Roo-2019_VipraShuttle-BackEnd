var express = require('express');
var router=express.Router();


var shuttle = require('../routes/models/shuttle.js');
var driver = require('../routes/models/driver.js');
var shuttles = require('../routes/models/shuttlebooking.js');

router.get('/dashboardDetails', function(req,res){
    console.log(shuttle);
    var result=[];
    // shuttle.find({},function (err,details) {
    //     res.json(details);
    // });
    shuttle.aggregate([
        //{ $match: {did: driverdetails._id}},
        { $lookup:
                {
                    from: 'driverdetails',
                    localField: 'string',
                    foreignField: 'string',
                    as: 'driver'
                }
        }
    ],function(err, data){
        //console.log(JSON.stringify(data));
        data.forEach(function(obj){
            //console.log(obj);
            obj["driver"] = obj["driver"].filter(driver => driver._id == obj.did);
        });
        if (err) throw err;
        //console.log(JSON.stringify(data));
        res.json(data);
    });
    // shuttle.aggregate([
    //     { $lookup:
    //             {
    //                 from: 'driver',
    //                 localField: 'did',
    //                 foreignField: '_id',
    //                 as: 'shuttledetails'
    //             }
    //     }
    // ]).toArray(function(err, res) {
    //     if (err) throw err;
    //     console.log(JSON.stringify(res));
    // });
});

router.get('/ShuttleDriverDetails' ,function(req,res,next) {
    //console.log(req.body);
    driver.find({driverEmail: req.body.driverEmail}, function (err, user) {
        //  console.log(user);
        if (user.length <= 0){
            res.json('no user available register to login');
        }else{
            if(user[0]) {
                if (user[0].driverPassword === req.body.driverPassword) {
                    res.json({message: "Success", Usertype:user[0].Usertype, oid: user[0].oid, Lastname: user[0].Firstname});
                }else {
                    res.json({message:"Invalid credentials"})
                }
            }
        }
    });
});


// Get all dashboardbookingdetails
router.route('/getshuttlebooking').get(function (req, res, next) {
    console.log('in backend route page');

    shuttlebooking.find(function (err, account) {
        if (err) return next(err);
        res.json(account);
    });
});


router.get('/getshuttelbooking',function(req,res){
    shuttles.find({},function (err,account) {
        console.log(account);
        res.json(account);

    });
});
module.exports = router;
