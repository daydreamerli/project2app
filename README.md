<<<<<<< HEAD
Project2 
=======
# project2app
monitoring the progress of  sustainability initiatives at OPAIC


Project2  FileStructure
>>>>>>> 818c8f58655298b9b7e42756c2fe691db2db4b36
|--config
 |--auth.js                 // contain the config for the authentications 
 |--passport.js            // contain the passport libary config code 
|--modules
 |--user.js                // contain the config for user mongodb
 |--passport.js            // contain the passport libary config code 
|--.env                     // the port and monogodb connection uri or other auth setting
|--public
  |--csss
     |--header.css            // partials css
     |--body.css
     |--footer.css
  |--img
     |--logo.jpg
     |--header.jpg
     |--slide.jpg 
     |--other.jpg                  // imgs used in the pages
  |--other                        // other resources used 
|--views
  |--api                         // api code for the charts       
   
  |--partials            // the partials ejs to form different pages ejs 
     |--head.ejs
     |--body.ejs
     |--footer.ejs 
   |--layout            // define the page layout 
     |--layout.ejs
     |--navbar.ejs
   --home.ejs
   --about.ejs
   --etc                  // this is all the pages ejs file
   
|-- app.js                // main entrace code for the node 
|--route
 |--index.js              // contain all the public pages route 
 |--admin/user.js         // contain the adminuser's backend fuction pages route

|--package.json

