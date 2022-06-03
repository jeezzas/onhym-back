const mongoose = require('mongoose');
const { Schema } = mongoose;

//Geologue Schema
const region = new Schema({ 

    nom:  {
      type: String, 
      required: true,
      maxlength : 40
    }
  
  });

const Region = mongoose.model('Region', region);

module.exports = Region;