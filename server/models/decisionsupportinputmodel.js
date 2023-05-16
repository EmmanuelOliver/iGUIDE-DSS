const mongoose = require('mongoose')

const Schema = mongoose.Schema

const situationSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    thoughts: [{
      type: String,
      required: true
    }],
    behaviors: [{
      type: String,
      required: true
    }],
    emotions: [{
      type: String,
      required: true
    }],
  });

  const Situation = mongoose.model('Situation', situationSchema);
  module.exports = Situation;

 