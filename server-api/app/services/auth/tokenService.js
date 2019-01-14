const jwt = require('jwt-simple');

module.exports = {

    /**
     * Get token when user signIn
     */
    getToken = (user) => {
        return jwt.encode({ sub: user._id, iat: new Date().getTime() }, 'secret');
    },
};
