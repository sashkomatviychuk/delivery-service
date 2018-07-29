require('dotenv').config();

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '27017';
const dbName = process.env.DB_NAME || 'delivery';

module.exports = {
    connection: `mongodb://${dbHost}:${dbPort}/${dbName}`,
};