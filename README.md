# project2app
monitoring the progress of  sustainability initiatives at OPAIC


Project2  FileStructure
|--config
 |--auth.js                 // contain the config for the authentications 
 |--passport.js            // contain the passport libary config code 
|--modules
 |--user.js                // contain the config for user mongodb
 |--passport.js            // contain the passport libary config code 
|--.env                     // the port and monogodb connection uri or other auth setting
|--public
  |--csss
     |--main.css         // main web frame css
  |--img
     |--logo.jpg
     |--header.jpg
     |--slide.jpg 
     |--other.jpg        // imgs used in the pages
  |--other               // other resources used 
|--views
  |--pages               // this is all the pages ejs file
     |--home.ejs
  |--partials            // the partials ejs to form different pages ejs 
     |--head.ejs
     |--body.ejs
     |--footer.ejs 
   |--layout            // define the page layout 
     |--layout.ejs
     |--navbar.ejs
   
|--index.js or app.js     // start node 
|--route
 |--index.js              // contain all the public pages route 
 |--admin/user.js         // contain the adminuser's backend fuction pages route

|--package.json
