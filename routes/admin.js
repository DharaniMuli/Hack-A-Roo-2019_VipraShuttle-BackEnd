var express = require('express');
var router=express.Router();
var driver = require('../routes/models/driver.js');

var shuttle = require('../routes/models/shuttle.js');

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

router.post('/ShuttleDriverDetails' ,function(req,res,next) {
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




module.exports = router;
