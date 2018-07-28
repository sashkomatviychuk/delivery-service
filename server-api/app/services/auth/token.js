const jwt = require('jwt-simple');

// get token when user signIn
module.exports = (user) => {
    return jwt.encode({ sub: user._id, iat: new Date().getTime() }, 'secret');
}