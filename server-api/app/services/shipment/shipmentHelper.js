const _ = require('lodash');

const fieldsAccessConfig = require('./fieldsAccessConfig');
const { USER_ROLES } = require('./../roles/definitions');
const { SHIPMENT_STATUSES, SHIPMENT_STATUSES_TITLES } = require('./definitions');

class ShipmentHelper {

    /**
     * @param {String} role 
     * @param {String} status
     * @returns {String[]}
     */
    static getEditableFields(role, status) {
        return _.get(fieldsAccessConfig, `${role}.${status}`, []);
    }

    /**
     * @param {Object} user
     * @returns {Object} 
     */
    static getUserFilter(user) {
        const filter = {};

        if (user.role === USER_ROLES.shipper) {
            filter.shipper_id = user._id;
        } else if (user.role === USER_ROLES.biker) {
            filter.biker_id = user._id;
        }

        return filter;
    }

    /**
     * @param {Array<Object>} stats 
     */
    static prepareShipmentsStats(stats) {
        const statsAsObject = stats.reduce((result, item) => {
            _.set(result, item.status, item.count);
            return result;
        },{});

        return _.map(SHIPMENT_STATUSES, statusName => {
            return {
                status: SHIPMENT_STATUSES_TITLES[statusName],
                count: statsAsObject[statusName] || 0,
            }
        });
    }
}

module.exports = ShipmentHelper;
