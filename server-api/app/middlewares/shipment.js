const _ = require('lodash');

const ShipmentService = require('./../services/shipment/shipmentService');
const ValidationError = require('./../services/abstract/validationError');

module.exports = {

    /**
     * Get shipments list
     * @param {Request} req 
     * @param {Response} res 
     */
    async getShipments(req, res) {
        const shipmentService = new ShipmentService();
        // get list of shipments
        try {
            const shipments = await shipmentService.getPreparedShipments(req);

            return res.json({ shipments, result: 1 });
        } catch (err) {
            return res.json({ result: 0 });
        }
    },

    /**
     * Get shipment by id
     * @param {Request} req 
     * @param {Response} res 
     */
    async getShipment(req, res) {
        const shipmentService = new ShipmentService();
        // one shipment
        try {
            const shipment = await shipmentService.findById(req.params.id);

            if (!shipment) {
                return res.status(404).json({ result: 0 });
            }

            return res.json({
                shipment,
                result: 1,
            });
        } catch (err) {
            return res.json({ result: 0 });
        }
    },

    /**
     * Add new shipment by shipper
     * @param {Request} req 
     * @param {Response} res 
     */
    async postShipment(req, res) {
        const shipmentService = new ShipmentService();

        try {
            await shipmentService.create(req.body, req.user);
            return res.json({ result: 1 });
        } catch (err) {
            if (err instanceof ValidationError) {
                return res.json({
                    error: err.message,
                    result: 0
                });
            }

            console.log(err);

            return res.json({ result: 0 });
        }
    },

    /**
     * Edit existing shipment
     * @param {Request} req 
     * @param {Response} res 
     */
    async putShipment(req, res) {
        const user = req.user;
        const data = req.body;
        const id = req.params.id;
        const shipmentService = new ShipmentService();

        try {
            await shipmentService.updateShipment(data, id, user);
        } catch (err) {
            if (err instanceof ValidationError) {
                return res.json({
                    error: err.message,
                    result: 0
                });
            }
            
            return res.json({ result: 0 });
        }
    }
};
