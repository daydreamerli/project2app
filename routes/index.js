const express = require('express');
const router  = express.Router();
const MongoClient = require('mongodb').MongoClient;
// hosted mongodb instance url
const url = 'mongodb+srv://ffndj:Project2@cluster0.nj32a.mongodb.net/<dbname>?retryWrites=true&w=majority';

// creates const for name of our database
const dbName = 'Sustainability';



//login page

router.get('/', function(req, res) {
    res.render('index')
});

// router.get('/about', (req, res) => {
//     res.render('about', { text: 'About Page'})
// });

router.get('/achievements', function(req, res) {
    res.render('achievements')
});

router.get('/project_e', function(req, res) {
    res.render('project_e')
});

router.get('/project_w', function(req, res) {
    res.render('project_w')
});

router.get('/project_s', function(req, res) {
    res.render('project_s')
});

router.get('/about', function(req, res) {
    res.render('about')
});

router.get('/test_1', function(req, res) {
    res.render('test_1')
});



// creates GET request route for index
router.get('/test', (req, res) => {

    // opens connection to mongodb
    MongoClient.connect(url, {
        useUnifiedTopology: true
    }).then(client => {

        // creates const for our database
        const db = client.db(dbName);
        // creates const for 'projects' collection in database
        const col = db.collection('projects');

        // finds ALL entries in 'projects' collection/converts to array
        col.find({}).toArray().then(docs => {
            // logs message upon finding collection
            console.log('found entries for index');
            // renders index ejs template and passes projects array as data
            res.render('test', {
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

router.get('/api/power', (req, res) => {

    // opens connection to mongodb
    MongoClient.connect(url, {
        useUnifiedTopology: true
    }).then(client => {

        // creates const for our database
        const db = client.db(dbName);
        // creates const for 'projects' collection in database
        const col = db.collection('power20');

        // finds ALL entries in 'projects' collection/converts to array
        col.find({}).toArray().then(docs => {
            // logs message upon finding 'projects' collection
            console.log('found entries for api');
            let powerInfo = [];
            // loops through data from entry variable
            docs.forEach(entry => {
                // pushes values from entries variable to empty entryInfo array
                if (entry.Power != null) {
                    powerInfo.push({ Date: (entry.Date), Power: parseInt(entry.Power) });
                }
            });
            let uniqPower = Array.from(new Set(powerInfo.map(a => a.Date)))
                .map(Date => {
                    return powerInfo.find(a => a.Date === Date)
                });
            // sends/renders entries array to /api/data page
            res.send(uniqPower);
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


// creates GET request route for /api/data page
router.get('/api/power21', (req, res) => {

    // opens connection to mongodb
    MongoClient.connect(url, {
        useUnifiedTopology: true
    }).then(client => {

        // creates const for our database
        const db = client.db(dbName);
        // creates const for 'projects' collection in database
        const col = db.collection('power21');

        // finds ALL entries in 'projects' collection/converts to array
        col.find({}).toArray().then(docs => {
            // logs message upon finding 'projects' collection
            console.log('found entries for api');
            let power1Info = [];
            // loops through data from entry variable
            docs.forEach(entry => {
                // pushes values from entries variable to empty entryInfo array
                if (entry.Power != null) {
                    power1Info.push({ Date: (entry.Date), Power: parseInt(entry.Power) });
                }
            });
            let uniqPower1 = Array.from(new Set(power1Info.map(a => a.Date)))
                .map(Date => {
                    return power1Info.find(a => a.Date === Date)
                });
            // sends/renders entries array to /api/data page
            res.send(uniqPower1);
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

module.exports = router; 
