const _ = require('lodash');
const Joi = require('joi');

const { DISCOUNT_TYPES } = require('./../shipment/definitions');

const validationKeys = {
    title: Joi.string().max(255).required()
        .error(() => 'Title is required and max length 255 chars'),

    origin_address: Joi.string().max(255).required()
        .error(() => 'Origin address is required and max length 255 chars'),

    destination_address: Joi.string().max(255).required()
        .error(() => 'Destination address is required and max length 255 chars'),
    
    cost: Joi.number().min(0)
        .error(() => 'Cost must be a number greater than 0'),
    
    discount_type: Joi.string().valid([
            DISCOUNT_TYPES.amount,
            DISCOUNT_TYPES.percentage,
        ])
        .error(() => 'Discount type can be only amount or percentage'),

    discount_value: Joi.number()
        .error(() => 'Discount value must be a number'),
};

module.exports = {

    /**
     * Validate shipment fields
     * @param {Object} shipment 
     * @param {Array<String>|undefined} fields 
     * @returns {Object}
     */
    validate(shipment, fields) {
        let schema;

        if (Array.isArray(fields) && fields.length) {
            schema = Joi.object().keys(_.pick(validationKeys, fields));
        } else {
            schema = Joi.object().keys(validationKeys);
        }

        return Joi.validate(shipment, schema);
    }
};
