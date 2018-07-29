const express = require('express');

const auth = require('./auth');
const user = require('./user');
const shipment = require('./shipment');

const router = express.Router();

// user routes
router.post('/login', auth.requireSignin, user.postLogin);
router.post('/register', user.postRegister);
router.post('/logout', auth.requireAuth, user.postLogout);

// shipment routes

module.exports = router;