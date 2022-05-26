const mongoose = require('mongoose');
const { Schema } = mongoose;

const domaineMin = new Schema({
    nDomaine : {
     
      type : Number,
      index: {unique: true, dropDups: true},
      required : true
    },
    conditionDm :  {
      type: String, 
      required: true,
      enum: ['Domaine Propre','En Convention']
    },
    etatDm :  {
      type: String, 
      required: true,
      enum: ['Institution','Renouvlé']
    },
    dateInstitu :  {
      type: Date, 
      required: true
    },
    dateEcheance :  {
      type: Date, 
      required: true
    },
    coordonnees : {
        type: {
          type: String, 
          required: true,
          default : 'Point'
        },
        coordinates: {
          type: [Number],
          required: true
        },
    },
    geologue : [{  type: Schema.Types.ObjectId,
       ref: 'Geologue',
       
    }],
    carteTopo : {
      type :String, 
      required : true
    },
    substance : [{type: Schema.Types.ObjectId,
      ref: 'Substance'
    }],
    typeDm : {type : String, 
      required : true,
      enum: ['Permis de recherche','Licence d exploitation']}
},{ timestamps: true });

const domaineMinier = mongoose.model('Domaine minier', domaineMin);

module.exports = domaineMinier;
