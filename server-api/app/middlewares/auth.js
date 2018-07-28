const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local');

const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.status(401).json({ result: 0 });
};

module.exports = {
    requireAuth,
    requireSignin,
    auth,
};