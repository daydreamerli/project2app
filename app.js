// Imports
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts')
const port = process.env.PORT || 4000;
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index')
// const chartsRouter = require('./routes/charts');
require('dotenv/config')

app.use('/',indexRouter);
// app.use('/charts', chartsRouter);
// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/api', express.static(__dirname + '/views/api'))
app.use(express.static(__dirname + '/views'));
// Set View engine
app.set('view engine', 'ejs')
// Set views folder
app.set('views', path.join(__dirname, 'views'));

// app.use(expressLayouts);

// bodyParser middleware (returns POST requests as JSON)
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });


//  Listen on port 
app.listen(port, () => console.info(`Listening on port ${port}`))