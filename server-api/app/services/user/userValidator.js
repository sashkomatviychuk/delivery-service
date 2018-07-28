const Joi = require('joi');

const AbstractValidator = require('./../abstract/validator');
const { USER_ROLES } = require('./../roles/definitions');

class UserValidator extends AbstractValidator {

    /**
     * Joi validation schema keys
     */
    getSchemaKeys() {
        return {
            first_name: Joi.string().max(255).required(),
            last_name: Joi.string().max(255).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(2).required(),
            role: Joi.string().required().valid([
                USER_ROLES.shipper,
                USER_ROLES.manager,
                USER_ROLES.biker,
            ]),
        };
    }
}

module.exports = UserValidator;
