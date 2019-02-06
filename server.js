const express = require("express");

const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;
//all the server side runs on port 3001
//all the client side runs on port 3000
//in client side package.json --> will have a proxy telling the server to run the server to 3001 so that our url request can find a correct way


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//npm run build --> will build all your files that you need statically serve on your website
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
//above if statement: if it's under production environment, just serve the producton file


// Add routes, both API and view
require('./routes/api-routes')(app);

// Connect to the Mongo DB
//mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactSurveys");
mongoose.connect(process.env.MONGODB_URI || "mongodb://mingDatabase:ming123456@ds237979.mlab.com:37979/heroku_svp183d9");


// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});