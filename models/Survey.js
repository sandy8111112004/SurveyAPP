const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new TweetSchema object
const SurveySchema = new Schema({
  selection: [{
    question: {
      type: String,
      required: "You must enter a question"
    },
    options: [
      {
        type: String
      }
    ]
  }],
  question: [{
    questionContent: {
      type: String,
      required: "You must enter a question"
    }
  }],
  answer: [
    [{
      answer: String,
      id: String,
    }]
  ]


});

// This creates our model from the above schema, using Mongoose's model method
var Survey = mongoose.model('Survey', SurveySchema);

// Export the Tweet model
module.exports = Survey;