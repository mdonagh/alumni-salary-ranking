// This is our mongoose.js file located in /config/mongoose.js
// This is a config file that connects to MongoDB and loads all of our models for us. We do this here because we don't want to have to connect to the DB every time we require a model!
// require mongoose
var mongoose = require('mongoose');
// require file-system so that we can load, read, require all of the model files
var fs = require('fs');
// connect to the database
var path = require('path');
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };       
 
var mongodbUri = 'mongodb://heroku_w9spmwn2:lqof7a0ns914cn7f2admmuaqk9@ds019068.mlab.com:19068/heroku_w9spmwn2';
 
mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;             
 
conn.on('error', console.error.bind(console, 'connection error:'));  
 
  // Wait for the database connection to establish, then start the app.                         

// specify the path to all of the models
var models_path = path.join(__dirname, './../models');
// read all of the files in the models_path and require (run) each of the javascript files
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') >= 0) {
    // require the file (this runs the model file which registers the schema)
    require(models_path + '/' + file);
  }
});