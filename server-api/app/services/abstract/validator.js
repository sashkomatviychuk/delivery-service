const _ = require('lodash');
const Joi = require('joi');

class AbstractValidator {

    /**
     * Joi validation schema keys
     */
    getSchemaKeys() {
        throw new Error(`${this.constructor.name} must override method getSchemaKeys`);
    }

    /**
     * @param {Object} data 
     * @param {Array<String>|undefined} fields 
     * @returns {Object}
     */
    validate(data, fields) {
        const validationKeys = this.getSchemaKeys();
        let schema;

        if (Array.isArray(fields) && fields.length) {
            schema = Joi.object().keys(_.pick(validationKeys, fields));
        } else {
            schema = Joi.object().keys(validationKeys);
        }

        return Joi.validate(data, schema);
    }
}

module.exports = AbstractValidator;
