const Joi = require('joi');



const schema = Joi.object({
    fullName: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    isActive: Joi.boolean().default(true),

});


function validateUserData(data) {
    return schema.validate(data);
}

module.exports = validateUserData;
