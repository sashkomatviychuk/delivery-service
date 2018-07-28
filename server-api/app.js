const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment');

const config = require('./app/config');
// require controllers
// add middlewares
// models
require('./app/models');

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

        // apply routes
        this.express.use('/api', issuesController);
    }

    setupViews() {
        this.express.locals.moment = moment;
    }

    setupDb() {
        mongoose.connect(config.connection);
    }
}

module.exports = new Application().express;
