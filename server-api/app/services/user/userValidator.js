const Joi = require('joi');

const AbstractValidator = require('./../abstract/validator');
const { USER_ROLES } = require('./../roles/definitions');

class UserValidator extends AbstractValidator {

    /**
     * Joi validation schema keys
     */
    getSchemaKeys() {
        return {
            first_name: Joi.string().max(255).required()
                .label('First name')
                .error(() => 'First name is required and max length 255 chars'),
            last_name: Joi.string().max(255).required()
                .label('Last name')
                .error(() => 'Last name is required and max length 255 chars'),
            email: Joi.string().email().required()
                .label('Email')
                .error(() => 'Email must be a valid email address'),
            password: Joi.string().min(2).required()
                .label('Password')
                .error(() => 'Password min length must be 2 characters'),
            role: Joi.string().required().valid([
                USER_ROLES.shipper,
                USER_ROLES.manager,
                USER_ROLES.biker,
            ])
                .label('Role')
                .error(() => 'Not valid role name. Valid: shipper,manager,biker'),
        };
    }
}

module.exports = UserValidator;
