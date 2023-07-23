const Joi = require('joi') 

const organizationPanCardSchema = { 
  createorganizationPanCardSchema: Joi.object().keys({ 
    full_name: Joi.string().required(),
    father_name: Joi.string().required(),
    pancard_number:Joi.string().required(),
    pancard_image:Joi.any(),
    date_of_birth:Joi.string(),
    is_pancard_verified: Joi.any(),
  }),

  getOrganizationPanCardSchema: Joi.object().keys({
    id: Joi.number().min(1).required()
  }),

  putOrganizationPanCardSchema: Joi.object().keys({
    id: Joi.number().min(1).required()
  }),

  deleteOrganizationPanCardSchema: Joi.object().keys({
    id: Joi.number().min(1).required() 
  })
}; 

module.exports = organizationPanCardSchema;