var express = require('express');
var router=express.Router();
var booking=require('../routes/models/booking.js');

// router.get('/getAll', function (req, res, next) {
//     console.log("hai");
//     driver.find(function (err, data) {
//         console.log(data);
//         if (err) console.log(err);
//         res.json(data);
//     });
//
// });

router.post('/createBooking', function (req, res, next) {
    console.log(req.body);
    booking.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});




module.exports = router;

