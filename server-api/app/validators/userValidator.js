const { check } = require('express-validator/check');
const { USER_ROLES } = require('./../services/roles/definitions');

module.exports = {
    register: [
        check('first_name')
            .isLength({ min: 1, max: 255 })
            .withMessage('First Name is required and max length 255 chars'),
    
        check('last_name')
            .isLength({ min: 1, max: 255 })
            .withMessage('Last Name is required and max length 255 chars'),
    
        check('email')
            .isEmail()
            .withMessage('Email must be a valid email address'),
    
        check('password')
            .isLength({ min: 2 })
            .withMessage('Password min length must be 2 characters'),
        
        check('role')
            .isIn([
                USER_ROLES.shipper,
                USER_ROLES.manager,
                USER_ROLES.biker,
            ])
            .withMessage('Not valid role name. Valid: shipper,manager,biker'),
    ],
};