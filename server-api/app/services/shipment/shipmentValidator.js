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
                .label('Title')
                .error(() => 'Title is required and max length 255 chars'),
        
            origin_address: Joi.string().max(255).required()
                .label('Origin address')
                .error(() => 'Origin address is required and max length 255 chars'),
        
            destination_address: Joi.string().max(255).required()
                .label('Destination address')
                .error(() => 'Destination address is required and max length 255 chars'),
            
            cost: Joi.number().min(0)
                .label('Cost')
                .error(() => 'Cost must be a number greater than 0'),
            
            discount_type: [
                Joi.valid([
                    null,
                    DISCOUNT_TYPES.amount,
                    DISCOUNT_TYPES.percentage,
                ]).label('Discount type'),
                Joi.allow(null),
            ],
            
        
            discount_value: [
                Joi.number().optional().label('Discount value'),
                Joi.allow(null),
            ],
        };
    }
}

module.exports = ShipmentValidator;
