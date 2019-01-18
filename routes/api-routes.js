const Note = require('../models/Note');
const mongoose = require("mongoose");

module.exports = function (app) {

  app.get('/api/notes', function (req, res) {
    Note.find({})
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });


  app.post('/api/notes', function (req, res) {
    Note.create(req.body)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.delete('/api/notes/:id', function (req, res) {
    Note.deleteOne({"_id": mongoose.Types.ObjectId(req.params.id)}).then(
        function (data) {
            res.json(data);
        }
    ).catch(
        function (err) {
            res.json(err);
        }
    )
  });

  app.put('/api/notes/:id', function (req, res) {
    Note.findOneAndUpdate({ _id: req.params.id }, {$set:{ complete: req.body.complete }})
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });



}