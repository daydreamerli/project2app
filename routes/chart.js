
// sets port varaible


// imports mongodb node driver & creates const for hosted mongo url
const MongoClient = require('mongodb').MongoClient;

// hosted mongodb instance url
const url = 'mongodb+srv://ffndj:Project2@cluster0.rju8j.mongodb.net/<dbname>?retryWrites=true&w=majority';

// sets view folder
app.set('views', path.join(__dirname, 'views'));

// sets view engine
app.set('view engine', 'ejs');

// bodyParser middleware (returns POST requests as JSON)
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// creates const for name of our database
const dbName = 'Sustainability';

// creates GET request route for index
app.get('/', (req, res) => {

  // opens connection to mongodb
  MongoClient.connect('mongodb+srv://ffndj:Project2@cluster0.rju8j.mongodb.net/<dbname>?retryWrites=true&w=majority', { useUnifiedTopology: true }).then(client => {

    // creates const for our database
    const db = client.db(dbName);

    // creates const for 'projects' collection in database
    const col = db.collection('projects');

    // finds ALL entries in 'projects' collection/converts to array
    col.find({}).toArray().then(docs => {

      // logs message upon finding collection
      console.log('found entries for index');

      // renders index ejs template and passes projects array as data
      res.render('index', {
        projects: docs
      });

      // closes connection to mongodb and logs message
      client.close(() => console.log('connection closed'));

    // checks for error in finding 'projects' collection
    }).catch(err => {

      // logs message upon error in finding 'projects' collection
      console.log('error finding data', err);

    });

  // checks for error in connecting to mongodb
  }).catch(err => {

    // logs message upon error connecting to mongodb
    console.log('error connecting to mongodb', err);

  });

});

// creates GET request route for /entry/add page and renders ejs template
app.get('/entry/add', (req, res) => res.render('entry/add'));

// creates POST request route for /entry/add page
 app.post('/entry/add', (req, res) => {

   // logs message with POST request data
   console.log(req.body);

   // creates empty entry object/stores POST request data in entry object
   let entry = {};
   entry.power = req.body.power;
   entry.water = req.body.water;
     entry.month = req.body.month;

   // opens connection to mongodb
   MongoClient.connect('mongodb+srv://ffndj:Project2@cluster0.rju8j.mongodb.net/<dbname>?retryWrites=true&w=majority', { useUnifiedTopology: true }).then(client => {

     // creates const for our database
     const db = client.db(dbName);

     // creates const for 'projects' collection in database
     const col = db.collection('projects');

     // inserts ONE entry into 'projects' collection
     col.insertOne(entry).then(doc => {

       // logs message upon inserting entry to 'projects' collection
       console.log('entry inserted', doc);

       // reloads page after POST req submit
       res.redirect('/entry/add');

       // closes connection to mongodb and logs message
       client.close(() => console.log('connection closed'));

     // checks for error in inserting entry to 'projects' collection
     }).catch(err => {

      // logs message upon error in inserting entry to 'projects' collection
      console.log('error inserting entry', err);

     });

   // checks for error in connecting to mongodb
   }).catch(err => {

   // logs message upon error connecting to mongodb
   console.log('error connecting to mongodb', err);

   });

 });
 
/*
// creates GET request route for /employees/delete page and renders ejs template
app.get('/entry/delete', (req, res) => res.render('entry/delete'));
 
// creates POST request route for /employees/delete page
app.post('/entry/delete', (req, res) => {

   // logs message with POST request data
   console.log(req.body);

   // creates empty employee object/stores POST request data in employee object
   let entry = {};
   entry.power = req.body.power;
    entry.water = req.body.water;
    entry.month = req.body.month;

   // opens connection to mongodb
   MongoClient.connect(url).then(client => {

     // creates const for our database
     const db = client.db(dbName);

     // creates const for 'employees' collection in database
     const col = db.collection('projects');

     // deletes ALL employees with employee.name from 'employees' collection
     col.remove({name: employee.name}).then(doc => {

      // logs message upon inserting employee to 'employees' collection
      console.log('entry(s) deleted', doc);

      // redirects user back to index page after POST req submit
      res.redirect('/');

      // closes connection to mongodb and logs message
      client.close(() => console.log('connection closed'));

      // checks for error in deleting employee(s) from 'employees' collection
      }).catch(err => {

      // logs message upon error in deleting employee(s) from 'employees' collection
      console.log('error deleting employee', err);

     });

   // checks for error in connecting to mongodb
   }).catch(err => {

     // logs message upon error connecting to mongodb
     console.log('error connecting to mongodb', err);

   });

 });
 */
 
// creates GET request route for /api/data page
app.get('/api/data', (req, res) => {

  // opens connection to mongodb
  MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {

    // creates const for our database
    const db = client.db(dbName);

    // creates const for 'projects' collection in database
    const col = db.collection('projects');

    // finds ALL entries in 'projects' collection/converts to array
    col.find({}).toArray().then(docs => {

      // logs message upon finding 'projects' collection
      console.log('found entries for api');

      // sends/renders entries array to /api/data page
      res.send(docs);

      // closes connection to mongodb and logs message
      client.close(() => console.log('connection closed'));

    // checks for error finding 'projects' collection
    }).catch(err => {

      // logs message upon error finding 'projects' collection
      console.log('unable to find entries for api', err);

    });

  // checks for error in connecting to mongodb
  }).catch(err => {

    // logs message upon error connecting to mongodb
    console.log('error connecting to mongodb', err);

  });

});

// listens to port 300 and logs message when listening
app.listen(port, () => console.log(`listening on ${port}`));
