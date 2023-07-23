const Joi = require('joi') 

const organizationSchema = { 
  createOrganizationSchema: Joi.object().keys({ 
    name: Joi.string(),
    category_id:Joi.string(),
    city:Joi.string(),
    display_name:Joi.string(),
    display_logo:Joi.any(),
    address:Joi.string(),
    area:Joi.string(),
    state:Joi.string(),
    pin_code :Joi.string(),
    country:Joi.string(),
    email:Joi.string(),
    phone_number:Joi.number(),
    password: Joi.string().min(6).empty(''),
    is_email_verified: Joi.any(),
    is_password_reset: Joi.any(),
    latitude:Joi.string(),
    longitude:Joi.string(),
  }),

  login: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  }),

  getOrganizationSchema: Joi.object().keys({
    id: Joi.number().min(1).required()
  }),

  getOrganizationBySearchSchema: Joi.object().keys({
    name: Joi.string().required()
  }),


  putOrganizationSchema: Joi.object().keys({
    id: Joi.number().min(1)
  }),

  deleteOrganizationSchema: Joi.object().keys({
    id: Joi.number().min(1).required() 
  })
}; 

module.exports = organizationSchema;