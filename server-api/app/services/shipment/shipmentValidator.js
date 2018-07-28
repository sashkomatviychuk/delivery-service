const Joi = require('joi');

const AbstractValidator = require('./../abstract/validator');
const { DISCOUNT_TYPES } = require('./../shipment/definitions');

class ShipmentValidator extends AbstractValidator {

    /**
     * Joi validation schema keys
     */
    getSchemaKeys() {
        return {
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
    }
}

module.exports = ShipmentValidator;
