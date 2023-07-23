const Joi = require('joi');

const enquirySchema = {
    createEnquiry: Joi.object().keys({
        full_name: Joi.string().required(),
        email: Joi.string().required(),
        phone_number: Joi.number().required(),
        organization_name: Joi.string().required(),
        is_approved: Joi.string(),
        reason:Joi.any(),
    }),

    getEnquiry: Joi.object().keys({
        id: Joi.number().min(1).required(),
    }),

    updateEnquiry : Joi.object().keys({
        id: Joi.number().min(1).required(),
        is_approved: Joi.string().valid('approved','rejected').required(),
        reason:Joi.any().required(),
    }),

    deleteEnquiry: Joi.object().keys({
        id: Joi.number().min(1).required()
    })
};

module.exports = enquirySchema;