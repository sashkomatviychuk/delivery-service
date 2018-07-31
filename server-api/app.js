const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment');
const passport = require('passport');

const config = require('./app/config');
// require controllers
const apiRoutes = require('./app/middlewares/routes');
// models
require('./app/models');
// passport
require('./app/services/auth/passport');

/**
 * Application definition
 */
class Application {

    constructor() {
        this.express = express();

        // configure application
        this.middlewares();
        this.setupViews();
        this.setupDb();
    }

    middlewares() {

        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(cookieParser());

        // init passport
        this.express.use(passport.initialize());
        this.express.use(passport.session());

        this.express.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            next();
        });

        // apply routes
        this.express.use('/api', apiRoutes);
        this.express.use((req, res) => {
            res.status(404).json({
                error: 'Not found',
            });
        });
    }

    setupViews() {
        this.express.locals.moment = moment;
    }

    setupDb() {
        mongoose.connect(config.connection);
    }
}

module.exports = new Application().express;
