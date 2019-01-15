const _ = require('lodash');

const TokenService = require('./../services/auth/tokenService');
const UserService = require('./../services/user/userService');
const ValidationError = require('./../services/abstract/validationError');
const ShipmentService = require('./../services/shipment/shipmentService');

module.exports = {

    /**
     * @param {Request} req 
     * @param {Response} res 
     */
    async postLogin(req, res) {
        if (!req.user) {
            return res.json({ result: 0 });
        }

        const data = _.pick(req.user, ['_id', 'first_name', 'last_name', 'email', 'role']);
        const token = TokenService.getToken(req.user);

        res.json({
            data,
            token,
            result: 1,
        });
    },

    /**
     * @param {Request} req 
     * @param {Response} res 
     */
    async postLogout(req, res) {
        try {
            req.logout();
            return res.json({ result: 1 });
        } catch (err) {
            return res.json({ result: 0 });
        }
    },

    /**
     * @param {Request} req 
     * @param {Response} res 
     */
    async postRegister(req, res) {
        const service = new UserService();
        
        try {
            await service.create(req.body);

            res.json({ result: 1 });
        } catch (err) {
            res.json({ result: 0 });
        }
    },

    /**
     * @param {Request} req 
     * @param {Response} res 
     */
    async getStats(req, res) {
        const shipmentService = new ShipmentService();

        try {
            const stats = await shipmentService.getStats(req.user);

            return res.json({
                stats,
                result: 1,
            });
        } catch (err) {
            return res.json({ result: 0 });
        }
    },

    /**
     * @param {Request} req 
     * @param {Response} res 
     */
    async getBikersList(req, res) {
        const service = new UserService();

        try {
            const bikers = await service.getBikersList();

            return res.json({
                bikers,
                result: 1,
            });
        } catch (err) {
            return res.json({ result: 0 });
        }
    }
};
