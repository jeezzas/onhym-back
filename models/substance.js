const mongoose = require('mongoose');
const { Schema } = mongoose;

const substance = new Schema({ 
    nom :  {
     type: String, 
     required: true
   }, 
   entite : {
    type: Schema.Types.ObjectId,
     ref: 'Entite administrative'
  }
 });

 const Substance = mongoose.model('Substance', substance);

module.exports = Substance;