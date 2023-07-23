const Joi = require('joi') 

const organizationBankDetailsSchema = { 
  createorganizationBankDetailsSchema: Joi.object().keys({ 
    org_id: Joi.string().required(),
    address: Joi.string().required(),
    GSTN:Joi.string().required(),
    account_number:Joi.string().required(),
    bank_name:Joi.string().required(),
    bank_branch_name:Joi.any(),
    ifsc_code:Joi.string(),
    front_image: Joi.any(),
    back_image: Joi.any(),
  }),

  getOrganizationBankDetailsSchema: Joi.object().keys({
    id: Joi.number().min(1).required()
  }),

  putOrganizationBankDetailsSchema: Joi.object().keys({
    id: Joi.number().min(1).required()
  }),

  deleteOrganizationBankDetailsSchema: Joi.object().keys({
    id: Joi.number().min(1).required() 
  })
}; 

module.exports = organizationBankDetailsSchema;