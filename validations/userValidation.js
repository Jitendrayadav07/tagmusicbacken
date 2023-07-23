const Joi = require('joi') 

const userSchema = {
    registerUser: Joi.object().keys({ 
        full_name: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string().required(),
        role_id: Joi.number(),
        password: Joi.string().min(7).empty(''),
        is_email_verified: Joi.any(),
      }),
      
    login: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required()
     })
};

module.exports = userSchema;