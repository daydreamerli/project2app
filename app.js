// Imports
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts')
const port = process.env.PORT || 4000;
const router = express.Router();
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

// Set Views
app.set('views', ('./views'))
app.set('view engine', 'ejs')
// app.use(expressLayouts);

// bodyParser middleware (returns POST requests as JSON)
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// connect to mongodb
// mongoose.connect(
//   process.env.DB_CONNECTION,
//   {useNewUrlParser: true, useUnifiedTopology : true})
// .then(() => console.log('connected,,'))
// .catch((err)=> console.log(err));
 
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