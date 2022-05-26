const mongoose = require('mongoose');

const { Schema } = mongoose;

const administrateur = new Schema({
    nMatAdmin : { 
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
    password : { 
        type :String,
        required : true,
        },
    email : { 
        type :String,
        required : true,
        unique : true
        },
})

const Administrateur = mongoose.model('Administrateur', administrateur);

module.exports = Administrateur;

