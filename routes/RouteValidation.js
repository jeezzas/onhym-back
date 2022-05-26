
//validation 
const Joi = require('@hapi/joi');

const registerValidation=data=>{
    const schema = Joi.object({
        nMatAdmin : Joi.string().required().min(4),
        nom : Joi.string().required() ,
        prenom : Joi.string().required(),
        password : Joi.string().required().min(8),
        email : Joi.string().required().email().min(10)
      });
    return schema.validate(data); 
}


const loginValidation=data=>{
    const schema = Joi.object({
        email : Joi.string().required(),
        password : Joi.string().required()
        
      });
      return schema.validate(data); 
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;