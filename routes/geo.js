const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Geologue = require("../models/geologue");
const Entite = require("../models/entite_administrative");



//POST Entite
router.post('/', (req,res, next)=>{
    const geologue = new Geologue({
        _id : new mongoose.Types.ObjectId(),
        nMat : req.body.nMat, 
        nom : req.body.nom,
        prenom : req.body.prenom,
        email : req.body.email,
        entite : req.body.entite,
    });
    geologue.save().
    then(result=>{
        console.log(result)
    }).
    catch(err=>console.log(err));
    res.status(201).json({
        message: 'POST  Request to /domain_min',
        createdGeo : geologue
    });
})

//get Geo by ID
router.post("/findbyentite", async(req, res, next) => {
    const nom = req.body.nomEntite;
    const entiteId= await Entite.findOne({nomEntite : nom}, "_id");

    Geologue.find({ entite : entiteId},"nMat")
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

 
router.post("/findOne", (req,res, next)=>{
        const id=req.body.id;
         Geologue.findById(id).exec().then(doc=>{
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
        })


 router.post("/findManyGeos", (req,res, next)=>{
          const ids=req.body.ids;
          var geologues=[];         
           ids.forEach(async(id) => {
             await Geologue.findById(id).exec().then(doc=>{
              if (doc) {
                if(geologues.length != ids.length)
                geologues.push(doc);
                if(geologues.length == ids.length){      
                 res.status(200).json(geologues);
                }
              
              } 
            }).catch(err => {
              console.log(err);

            }); 
            
          })         
        });
       

          



  
module.exports = router;
