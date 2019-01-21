const Survey = require('../models/Survey');
const mongoose = require("mongoose");

module.exports = function (app) {

  app.get('/api/survey/:id', function (req, res) {

    Survey.findOne({_id:req.params.id})
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });


  app.post('/api/survey', function (req, res) {
    Survey.create(req.body)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.delete('/api/survey/:id', function (req, res) {
    Survey.deleteOne({"_id": mongoose.Types.ObjectId(req.params.id)}).then(
        function (data) {
            res.json(data);
        }
    ).catch(
        function (err) {
            res.json(err);
        }
    )
  });

  app.put('/api/survey/answer/:id', function (req, res) {
    Survey.findOneAndUpdate({ _id: req.params.id }, {$push: {answer: req.body.answer} })
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });



}