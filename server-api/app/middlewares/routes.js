const express = require('express');

const auth = require('./auth');
const user = require('./user');
const shipment = require('./shipment');

const router = express.Router();

// user routes
router.post('/login', auth.requireAuth);
router.post('/register');
router.post('/logout', auth.auth);

// shipment routes

module.exports = router;