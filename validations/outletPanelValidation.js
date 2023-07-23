const Joi = require('joi') 

const OutletPanelSchema = { 

    createOutletPanel: Joi.object().keys({ 
        artist_name: Joi.string().required(),
        genre: Joi.string().required(),
        price_per_request: Joi.number().required()
    }),
     
    getOutletPanelSchema: Joi.object().keys({
        id: Joi.number().min(1).required()
        
    }),
    
    putOutletPanel: Joi.object().keys({
        id: Joi.number().min(1)
    }),
    
    deleteOutletPanel: Joi.object().keys({
        id: Joi.number().min(1).required() 
    })
}; 
module.exports = OutletPanelSchema;