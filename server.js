const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3001;
//all the server side runs on port 3001
//all the client side runs on port 3000

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

require('./routes/api-routes')(app);

// Connect to the Mongo DB
//mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactSurveys");
mongoose.connect(process.env.MONGODB_URI || `${process.env.mongodb}`);


// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

router.use(
  function(req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  }
)

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});