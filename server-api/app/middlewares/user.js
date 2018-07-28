const generateToken = require('./../services/auth/token');

module.exports = {

    async postLogin(req, res) {
        //
    },

    async postLogout(req, res) {
        try {
            req.logout();
            return res.json({ result: 1 });
        } catch (err) {
            return res.json({ result: 0 });
        }
    },

    async postRegister(req, res) {

    },
};
