const express = require('express');
const router  = express.Router();
// const mongoose = require('mongoose');

// const {ensureAuthenticated} = require('../config/auth') 
//login page

router.get('', (req, res) => {
    res.render('index', { text: 'This is how to use EJS in expressjs'})
});

router.get('/about', (req, res) => {
    res.render('about', { text: 'About Page'})
});
router.get('/achievements', (req, res) => {
    res.render('achievements', { text: 'OP Achievements'})
});
router.get('/projects', (req, res) => {
    res.render('projects', { text: 'This the place we show the project charts'})
});
router.get

module.exports = router; 
