//connect to db poll data
const MongoClient = require('mongodb').MongoClient;
const url = process.env.DB_CONNECTION;
//Import the mongoose module
const mongoose = require('mongoose');
const dbo = db.db("mydb");
    dbo.collection("postdata").find({}).toArray(function(err, result) {
      if (err) throw err;
     
      console.log('result', result);
      const postData = getPostData(result, ['month', 'number_of_posts']);
      console.log('postData', postData);
      var number_of_posts = getNumber_Of_Posts(postData);
      var post_in_month = getMonth_Of_Posts(postData);
     
      console.log('piechart data',number_of_posts);
      res.render('dashboard/piechart', { 
        title: 'My First Pie Chart',
        datai: JSON.stringify(number_of_posts),
        labeli: JSON.stringify(post_in_month)
       });
     
      db.close();

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

const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});