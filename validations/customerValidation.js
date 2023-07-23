const Joi = require('joi') 

const customerSchema = { 
  createCustomer: Joi.object().keys({ 
    customer_full_name: Joi.string().required(),
    performer_id :Joi.number().min(1).required() 
  }),

  getCustomer: Joi.object().keys({
    id: Joi.number().min(1).required() 
  }),

  putCustomer: Joi.object().keys({
    id: Joi.number().min(1)
  }),


  deleteCustomer: Joi.object().keys({
    id: Joi.number().min(1).required() 
  })
}; 
module.exports = customerSchema;