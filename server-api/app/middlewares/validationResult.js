const { get, head } = require('lodash');
const { validationResult } = require('express-validator/check');

module.exports = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = head(errors.array());

        return res.json({
            result: 0,
            error: get(error, 'msg', 'Validation error'),
        });
    }

    next();
};