const mongoose = require('mongoose');
const { Schema } = mongoose;

//Geologue Schema
const geologue = new Schema({ 
    nMat:  {
      type: String, 
      required: true,
    },
    nom:  {
      type: String, 
      required: true,
      maxlength : 40
    },
    prenom :  {
      type: String, 
      required: true,
      maxlength : 40
      
    },
     email :  {
      type: String, 
      required: true,
      lowercase : true
    },
    entite : {
      type: Schema.Types.ObjectId,
       ref: 'Entite administrative'
    }
  });

const Geologue = mongoose.model('Geologue', geologue);

module.exports = Geologue;