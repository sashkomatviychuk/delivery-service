const _ = require('lodash');

const CrudService = require('./../abstract/crudService');
const ShipmentValidator = require('./shipmentValidator');
const { SHIPMENT_STATUSES } = require('./definitions');
const getEditableFields = require('./editableFieldsHelper');
const ValidationError = require('./../abstract/validationError');
const { USER_ROLES } = require('./../roles/definitions');

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
        const role = req.user.role;
        const limit = _.get(req, 'query.limit', 10); // add from config
        const page = _.get(req, 'query.page', 1);
        const filter = {};

        if (user.role === USER_ROLES.shipper) {
            filter.shipper_id = user._id;
        } else if (user.role === USER_ROLES.biker) {
            filter.biker_id = user._id;
        }

        const list = this.getPaginatedList(filter, { limit, page });

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
            .populate('shipper_id', 'first_name', 'last_name')
            .populate('biker_id', 'first_name', 'last_name')
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
        const editableFields = getEditableFields(role, shipment.status);
        return _.extend({}, shipment, { editableFields });
    }

    /**
     * Creates new model entity
     * @param {Object} data
     */
    async create(data) {
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
        const editableFields = getEditableFields(role, status);
        const editableData = _.pick(data, editableFields);

        if (validator) {
            const { error } = validator.validate(editableData, editableFields);

            if (error) {
                throw new ValidationError(_.get(error, 'details[0].message'));
            }
        }

        try {
            return await model.update({ _id: id }, { $set: editableData });
        } catch (err) {
            throw err;
        }
    }

    /**
     * Get shipments stats for user if user type not equal 'manager'
     * Or all shipments stats for 'manager'
     * @param {Collection} user 
     */
    async getStats(user) {
        const model = this.getModel();
        const filter = {};

        if (user.role === USER_ROLES.shipper) {
            filter.shipper_id = user._id;
        } else if (user.role === USER_ROLES.biker) {
            filter.biker_id = user._id;
        }

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

        const statsAsObject = stats.reduce((result, item) => {
            _.set(result, item.status, item.count);
        },{});

        return _.map(SHIPMENT_STATUSES, statusName => {
            return {
                status: statusName,
                count: statsAsObject[statusName] || 0,
            }
        });
    }
}

module.exports = ShipmentService;