const Region = require("../models/region");
const express = require('express');
const mongoose = require("mongoose");

const router = express.Router();

//POST Domaine
router.post('/' ,(req,res, next)=>{
    const region = new Region({
        _id : new mongoose.Types.ObjectId(),
        nom : req.body.nom,
        
    });
  
    region.save().
    then(result=>{
        console.log(result)
     
    }).
    catch(err=>console.log(err));
    res.status(201).json({
        message: 'POST  Request to /region',
        createdRegion : region
    });
})


router.get('/',(req,res, next)=>{
    Region.find().exec().
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
   
module.exports = router;
