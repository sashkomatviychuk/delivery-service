const express = require('express');

const auth = require('./auth');
const user = require('./user');
const shipment = require('./shipment');
const handleValidationResult = require('./validationResult');

const shipmentValidator = require('./../validators/shipmentValidator');
const userValidator = require('./../validators/userValidator');

const router = express.Router();

// user routes
router.post('/login', auth.requireSignin, user.postLogin);
router.post('/register', userValidator.register, handleValidationResult, user.postRegister);
router.post('/logout', auth.requireAuth, user.postLogout);
router.get('/stats', auth.requireAuth, user.getStats);
router.get('/bikers', auth.requireAuth, user.getBikersList);

// shipment routes
router.get('/shipments', auth.requireAuth, shipment.getShipments);
router.get('/shipment/:id', auth.requireAuth, shipment.getShipment);

router.post(
    '/shipment',
    auth.requireAuth,
    auth.allowedForShipper,
    shipmentValidator.create,
    handleValidationResult,
    shipment.postShipment
);

router.put(
    '/shipment/:id',
    auth.requireAuth,
    shipmentValidator.update,
    handleValidationResult,
    shipment.putShipment
);

module.exports = router;