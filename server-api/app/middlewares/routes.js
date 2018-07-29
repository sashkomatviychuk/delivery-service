const express = require('express');

const auth = require('./auth');
const user = require('./user');
const shipment = require('./shipment');

const router = express.Router();

// user routes
router.post('/login', auth.requireSignin, user.postLogin);
router.post('/register', user.postRegister);
router.post('/logout', auth.requireAuth, user.postLogout);
router.get('/stats', auth.requireAuth, user.getStats);

// shipment routes
router.get('/shipments', auth.requireAuth, shipment.getShipments);
router.get('/shipment/:id', auth.requireAuth, shipment.getShipment);
router.post('/shipment', auth.requireAuth, auth.allowedForShipper, shipment.postShipment);
router.put('/shipment/:id', auth.requireAuth, shipment.putShipment);

module.exports = router;