const express = require('express');
const router = express.Router();
const PostModel = require('../models/blog');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://testuser:Project2tetkey@cluster0.fbxpx.mongodb.net/<testdb>";
//Import the mongoose module
const mongoose = require('mongoose');

/* GET Chart. */
router.get('/projects', function(req, res, callback) {

  blogPostData(function(result){
    var month_data = result.month_data; // here we can define the type of data we need
    var number_of_posts_data = result.number_of_posts_data;

    console.log(month_data, number_of_posts_data);
    res.render('projects/barchart', { 
      title: 'My First Bar Chart',
      datai: JSON.stringify(number_of_posts_data),
      labeli: JSON.stringify(month_data)
     });
  });

function getPostData(obj1, obj2) {
  return obj1.map(function(row) {
    var result = {};
    obj2.forEach(function(key) {
      result[key] = row[key];
    });
    return result;
  });
}

function getNumber_Of_Posts(postData){
  data =[];
  var i = 0;
  postData.forEach(function(content, callback){
    for(var key in content){
      //console.log('key: '+key, ', value: '+ content[key]);
      if(key == 'number_of_posts'){
        data[i] = content[key];
      }
    }
    i++;
  });
  return data;
}

function getMonth_Of_Posts(postData){
  data = [];
  var i = 0;
  postData.forEach(function(content, callback){
    for(var key in content){
      //console.log('key: '+key, ', value: '+ content[key]);
      if(key == 'month'){
        data[i] = content[key];
      }
    }
    i++;
  });
  return data;
}

function blogPostData(callback) {
  // after some calculation 
  PostModel.find({}, function(err, postData){
    if(err){
      console.log(err);
    }else{
      getSomeData(postData, callback);
    }
  });
}

function getSomeData(postData, callback){

  month_data = [];
  number_of_posts_data =[];
  var i = 0;
  postData.forEach(function(content, callback){

    for(var key in content){
      //console.log('key: '+key, ', value: '+ content[key]);
      if(key == 'month'){
        month_data[i] = content[key];
      }
      if(key == 'number_of_posts'){
        number_of_posts_data[i] = content[key];
      }
    }
    i++;
    });
    var callBackString = {};
    callBackString.month_data = month_data;
    callBackString.number_of_posts_data = number_of_posts_data
      //return data;
    callback(callBackString);    
}
});


module.exports = router;