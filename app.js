const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mognoose = require('mongoose');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const domaineRouter = require('./routes/domaineMin');
const adminRouter = require('./routes/admin');
const entiteRouter = require('./routes/entiteAdm');
const geoRouter = require('./routes/geo');
const subRouter = require('./routes/subs');
const regRouter = require('./routes/regi');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

var app = express();

const PORT = process.env.PORT || 8080;

mognoose.connect(process.env.DB_CONNECT,{
  useNewUrlParser : true,
  useUnifiedTopology : true

});
mognoose.connection.on('connected',()=>{console.log('mongoose connected')});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Middlewares
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(cors());
//Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/domaineMin',domaineRouter);
app.use('/entiteAdm',entiteRouter);
app.use('/admin',adminRouter);
app.use('/geologue',geoRouter);
app.use('/substance',subRouter);
app.use('/region',regRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
  });

// error handler
app.use((error, req, res, next) => {
    
    // render the error page
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });

  app.listen(3000, ()=> console.log('Running on 3000'));

module.exports = app;
