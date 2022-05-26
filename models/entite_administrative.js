const mongoose = require('mongoose');
const { Schema } = mongoose;

const entiteAdmin = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    nomEntite : {
        type : String,
        enum : ['Metaux de base','Metaux precieux','Roches et mineraux'],
        required : true,
        unique : true
    }, 
    chefEntite : {
        nMatriChef:{ 
        type :String,
        required : true,
        unique : true
        },
        nom : { 
        type :String,
        required : true,
     
        },
        prenom : { 
        type :String,
        required : true,
     
        },
        email : { 
        type :String,
        required : true,
        unique : true
        } 
    }
})

const entiteAdministrative =mongoose.model('Entite administrative',entiteAdmin);

module.exports = entiteAdministrative;
