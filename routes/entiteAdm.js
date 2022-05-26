const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Entite = require("../models/entite_administrative")

//GET Entite
router.get('/', (req,res, next)=>{
    Entite.find().exec().
    then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
   


//POST Entite
router.post('/', (req,res, next)=>{
    const entite = new Entite({
        _id : new mongoose.Types.ObjectId(),
        nomEntite : req.body.nomEntite, 
        chefEntite : req.body.chefEntite
    });
    entite.save().
    then(result=>{
        console.log(result)
    }).
    catch(err=>console.log(err));
    res.status(201).json({
        message: 'POST  Request to /domain_min',
        createdentite : entite
    });
})

//get Entite by ID
router.get("/:entiteID", (req, res, next) => {
    const id = req.params.entiteID;
    Entite.findById(id)
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json(doc);
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });

//PATCH Entite by ID
router.patch('/:entiteID', (req,res, next)=>{
    const id = req.params.entiteID;
   
    Entite.updateMany({ _id: id }, { $set: req.body })
      .exec()
      .then(result => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
})

//DELETE Entte by ID
router.delete('/:entiteID', (req,res, next)=>{
    const id = req.params.entiteID;
    Entite.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
})



module.exports = router;

