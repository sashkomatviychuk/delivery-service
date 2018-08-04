const _ = require('lodash');

const CrudService = require('./../abstract/crudService');
const ShipmentValidator = require('./shipmentValidator');
const ValidationError = require('./../abstract/validationError');
const ShipmentHelper = require('./shipmentHelper');

const { SHIPMENT_STATUSES } = require('./definitions');

class ShipmentService extends CrudService {

    /**
     * @returns {Schema} 
     */
    getModel() {
        return Shipment;
    }

    /**
     * @returns {ShipmentValidator}
     */
    getValidator() {
        return new ShipmentValidator();
    }

    /**
     * Get list of shipments with editable fields
     * @param {Request} req 
     */
    async getPreparedShipments(req) {
        const user = req.user;
        const role = user.role;
        const limit = _.get(req, 'query.limit', 20); // add from config
        const page = _.get(req, 'query.page', 1);

        const filter = ShipmentHelper.getUserFilter(user);
        let list = [];
        
        try {
            list = await this.getPaginatedList(filter, { limit, page });
        } catch (err) {
            throw err;
        }

        if (Array.isArray(list)) {
            return list.map(shipment =>
                this.applyEditableFieldsToShipment(role, shipment)
            );
        }

        return [];
    }

    /**
     * Returns paginated list of entities
     * @param {Object} filter
     * @param {Object} options
     * @returns {Array}
     */
    async getPaginatedList(filter, options) {
        const page = parseInt(options.page) || 1;
        const limit = parseInt(options.limit) || this.DEFAULT_ENTITIES_LIMIT;
        const skip = (page - 1) * limit;

        return await Shipment
            .find(filter || {})
            .populate('shipper_id', 'first_name last_name')
            .populate('biker_id', 'first_name last_name')
            .sort({ _id: -1 })
            .limit(limit)
            .skip(skip)
            .lean()
            .exec();
    }

    /**
     * @param {String} role 
     * @param {String} shipment 
     */
    applyEditableFieldsToShipment(role, shipment) {
        const editableFields = ShipmentHelper.getEditableFields(role, shipment.status);
        return _.extend({}, shipment, { editableFields });
    }

    /**
     * Creates new model entity
     * @param {Object} data
     */
    async create(data, user) {
        const model = this.getModel();
        const validator = this.getValidator();
        const fields = ['title', 'origin_address', 'destination_address', 'cost'];

        if (validator) {
            const { error } = validator.validate(data, fields);

            if (error) {
                throw new ValidationError(_.get(error, 'details[0].message'));
            }
        }

        const entity = new model(data);
        entity.shipper_id = user._id;

        try {
            await entity.save();
        } catch (err) {
            throw err;
        }
    }

    /**
     * Update shipment
     * @param {Object} data 
     * @param {ObjectId} id 
     * @param {Object} user 
     */
    async updateShipment(data, id, user) {
        const model = this.getModel();
        const validator = this.getValidator();

        const role = user.role;
        const shipment = await Shipment.findOne({ _id: id }).exec();

        if (!shipment) {
            throw new Error('Shipment doest not exists');
        }

        const status = shipment.status;
        const editableFields = ShipmentHelper.getEditableFields(role, status);
        const editableData = _.pick(data, editableFields);

        if (validator) {
            const { error } = validator.validate(editableData, editableFields);

            if (error) {
                throw new ValidationError(_.get(error, 'details[0].message'));
            }
        }

        // refactoring
        // move to separate function
        if (editableData.biker_id && shipment.status === SHIPMENT_STATUSES.waiting) {
            editableData.status = SHIPMENT_STATUSES.assigned;
        } else if (editableData.biker_id === null && shipment.status === SHIPMENT_STATUSES.assigned) {
            editableData.status = SHIPMENT_STATUSES.waiting;
        } else if (editableData.picked_at && shipment.status === SHIPMENT_STATUSES.assigned) {
            editableData.status = SHIPMENT_STATUSES.picked_up;
        } else if (editableData.delivered_at && shipment.status === SHIPMENT_STATUSES.picked_up) {
            editableData.status = SHIPMENT_STATUSES.delivered;
        }

        try {
            await model.update({ _id: id }, { $set: editableData });
        } catch (err) {
            throw err;
        }

        return await model.findOne({ _id: id }).lean().exec();
    }

    /**
     * Get shipments stats for user if user type not equal 'manager'
     * Or all shipments stats for 'manager'
     * @param {Collection} user 
     */
    async getStats(user) {
        const model = this.getModel();
        const filter = ShipmentHelper.getUserFilter(user);

        const stats = await model.aggregate(
            [
                {
                    $match: filter,
                },
                {
                    $group: {
                        _id: '$status',
                        count: { '$sum': 1 },
                    },
                },
                {
                    $project: {
                        status: '$_id',
                        count: 1,
                    },
                },
            ]
        ).exec();

        return ShipmentHelper.prepareShipmentsStats(stats);
    }
}

module.exports = ShipmentService;
