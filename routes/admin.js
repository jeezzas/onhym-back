const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Admin = require("../models/administrateur");
const {registerValidation, loginValidation } = require('./RouteValidation');
const verifyToken = require('./verifyToken');
const { token } = require('morgan');






const generateLoginToken = (admin) => {
 return (jwt.sign({ _id: admin._id ,nom : { nom: admin.nom,prenom: admin.prenom }}, process.env.TOKEN_SECRET)
  );
};


//Login Admin
router.post('/login', async(req,res)=>{
    //login validation
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //Checking if email is correct
    const admin = await Admin.findOne({ email : req.body.email});
    if(!admin) return res.status(400).json({message : 'email or password not correct'});

    //Checking if password is correct
    const validPass = bcrypt.compareSync(req.body.password, admin.password);
    if(!validPass) return res.status(400).send({message : 'email or password not correct '}) 
    else{
      //generate Token
      const loginToken = generateLoginToken(admin);
   


    console.log(admin.email+' password '+admin.password);

    return res.json({ status: 'ok', admin : {Nom : admin.nom, Prenom : admin.prenom} ,token: loginToken})
    };

    
    }
)



//Register Admin
router.post('/register', verifyToken, async (req,res, next)=>{
    //validation before posting data 

    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //hash password using bcrypt
    const saltRounds = 10;
    const hashedPass = bcrypt.hashSync(req.body.password, saltRounds);

    const admin = new Admin({
        _id : new mongoose.Types.ObjectId(),
        nMatAdmin : req.body.nMatAdmin,
        nom : req.body.nom,
        prenom : req.body.prenom,
        password : hashedPass,
        email : req.body.email
    }); 

    const savedAdmin = await admin.save();
    try{
      res.send(savedAdmin);
    }
    catch(err) {
        res.status(400).send(err);
    } 
});





//GET Admin
router.get('/', (req,res, next)=>{
  Admin.find().exec().
  then(docs => {
    console.log(docs);
      if (docs.length >= 0) {
    res.status(200).json(docs);
  } else {
    res.status(404).json({
    message: 'No entries found'
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

//GET Admin by ID
router.get("/one", (req, res, next) => {
    const id = req.body.id;
    Admin.findById(id)
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


  //LOGOUT 
  // router.post("/logout", verifyToken, (req, res) => {
  //   const refreshToken = req.body.token;
  //   refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  //   res.status(200).json("You logged out successfully.");
  // }); 

  module.exports = router;