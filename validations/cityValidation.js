const Joi = require('joi') 

const CitySchema = { 

    createCity: Joi.object().keys({ 
        name: Joi.string().required(),
    }),
     
    getCitySchema: Joi.object().keys({
        id: Joi.number().min(1).required()
        
    }),
    
    putCity: Joi.object().keys({
        id: Joi.number().min(1)
    }),
    
    deleteCity: Joi.object().keys({
        id: Joi.number().min(1).required() 
    })
}; 
module.exports = CitySchema;