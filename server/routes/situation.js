const express = require('express')
const Situation = require('../models/decisionsupportinputmodel')
const router = express.Router()

router.get('/:name', (req, res) => {
    Situation.findOne({ name: req.params.name }, (err, situation) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if(situation){
          res.send({ thoughts: situation.thoughts, behaviors: situation.behaviors, emotions: situation.emotions });
        }else{
          res.status(404).send({error: "No situation found with this id"})}
      }
    });
  });


module.exports = router

