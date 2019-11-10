var express = require('express');
var mongoose=require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');


config = require('./routes/mongo');

//routes
var appRoutes = require('./routes/app');
var adminRoutes=require('./routes/admin');
var signupRoutes=require('./routes/signup');
var driverRoutes=require('./routes/driver');
var userRoutes=require('./routes/user');
var bookingRoutes=require('./routes/bookings');
var cors = require('cors');

var app = express();

mongoose.Promise = global.Promise;

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

app.use(express.json());
app.use(bodyParser.json());

app.use(cors());
app.use('/', appRoutes);
app.use('/admin',adminRoutes);
app.use('/user',userRoutes);
app.use('/signup',signupRoutes);
app.use('/driver',driverRoutes);
app.use('/booking',bookingRoutes);

var port= process.env.PORT||3000;
app.listen(port,() => console.log('server started on port', port));

