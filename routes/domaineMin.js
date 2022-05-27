const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Domaine = require("../models/domaine_minier");
const verifyToken = require("./verifyToken");


//GET Domaine
router.get('/', verifyToken,(req,res, next)=>{
    Domaine.find().sort('-createdAt').exec().
    then(docs => {
        if (docs.length >= 0) {
      res.status(200).json(docs);
        } else {
            res.status(404).json({
              });
        }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
   


//POST Domaine
router.post('/', verifyToken ,(req,res, next)=>{
    const domaine = new Domaine({
        _id : new mongoose.Types.ObjectId(),
        nDomaine : req.body.nDomaine,
        conditionDm : req.body.conditionDm,
        etatDm : req.body.etatDm ,
        dateInstitu :req.body.dateInstitu ,
        dateEcheance : req.body.dateEcheance,
        coordonnees : req.body.coordonnees,
        geologue : req.body.geologue,
        carteTopo : req.body.carteTopo,
        substance : req.body.substance,
        typeDm : req.body.typeDm,        
    });
    domaine.createdAt;
    domaine.updatedAt;
    domaine.save().
    then(result=>{
        console.log(result)
     
    }).
    catch(err=>console.log(err));
    res.status(201).json({
        message: 'POST  Request to /domain_min',
        createdDomaine : domaine
    });
})

//get Domaine by ID
router.get("/:domaineID", verifyToken,(req, res, next) => {
    const id = req.params.domaineID;
    Domaine.findById(id)
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

//PATCH Domaine by ID
router.patch('/:domaineID',  verifyToken,(req,res, next)=>{
    const id = req.params.domaineID;
   
    Domaine.updateMany({ _id: id }, { $set: req.body })
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

//DELETE Domaine by ID
router.delete('/:domaineID', verifyToken,(req,res, next)=>{
    const id = req.params.domaineID;
    Domaine.remove({ _id: id })
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

