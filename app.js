// Imports
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts')
const port = process.env.PORT || 3000;
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
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(expressLayouts);
// connect to mongodb
mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('Connected to mongodb'))
.catch((err)=> console.log(err));
// set routes   => move them to routes 
// app.get('', (req, res) => {
//     res.render('index', { text: 'This is how to use EJS in expressjs'})
// })

// app.get('/about', (req, res) => {
//     res.render('about', { text: 'About Page'})
// })
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


//  Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`))