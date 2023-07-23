const Joi = require('joi') 

const CategorySchema = { 

    createCategorySchema: Joi.object().keys({ 
        name: Joi.string().required(),
    }),

    getCategorySchema: Joi.object().keys({
        id: Joi.number().min(1).required() 
      }),

    putCategorySchema: Joi.object().keys({
        id: Joi.number().min(1)
    }),
    
    deleteCategorySchema: Joi.object().keys({
        id: Joi.number().min(1).required() 
    })
}; 
module.exports = CategorySchema;