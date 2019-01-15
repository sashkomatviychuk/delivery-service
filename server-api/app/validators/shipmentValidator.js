const { check } = require('express-validator/check');
const { DISCOUNT_TYPES } = require('./../services/shipment/definitions');

module.exports = {
    create: [
        check('title')
            .isLength({ min: 1, max: 255 })
            .withMessage('Title is required and max length 255 chars'),
    
        check('origin_address')
            .isLength({ min: 1, max: 255 })
            .withMessage('Origin address is required and max length 255 chars'),
    
        check('destination_address')
            .isLength({ min: 1, max: 255 })
            .withMessage('Destination address is required and max length 255 chars'),
    
        check('cost')
            .isInt({ min: 0 })
            .withMessage('Cost must be a number greater than 0'),
    
        check('discount_type')
            .isIn([
                null,
                DISCOUNT_TYPES.amount,
                DISCOUNT_TYPES.percentage,
            ]),
    
        check('discount_value')
            .optional({ nullable: true })
            .isNumeric(),
    ],

    update: [
        check('title')
            .optional()
            .isLength({ min: 1, max: 255 })
            .withMessage('Title is required and max length 255 chars'),
    
        check('origin_address')
            .optional()
            .isLength({ min: 1, max: 255 })
            .withMessage('Origin address is required and max length 255 chars'),
    
        check('destination_address')
            .optional()
            .isLength({ min: 1, max: 255 })
            .withMessage('Destination address is required and max length 255 chars'),
    
        check('cost')
            .optional()
            .isInt({ min: 0 })
            .withMessage('Cost must be a number greater than 0'),
    
        check('discount_type')
            .optional()
            .isIn([
                null,
                DISCOUNT_TYPES.amount,
                DISCOUNT_TYPES.percentage,
            ]),
    
        check('discount_value')
            .optional({ nullable: true })
            .isNumeric(),
    ],
};