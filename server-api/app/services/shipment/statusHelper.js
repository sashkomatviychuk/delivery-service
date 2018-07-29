const _ = require('lodash');

const { SHIPMENT_STATUSES } = require('./definitions');

class StatusHelper {

    /**
     * Returns new status, when shipment is updated
     * @param {Object} newData 
     * @param {String} oldStatus 
     */
    static getNewStatus(newData, oldStatus) {
        if (_.has(newData, 'picked_at')) {
            return SHIPMENT_STATUSES.picked_up;
        }

        if (_.has(newData, 'delivered_at')) {
            return SHIPMENT_STATUSES.delivered;
        }

        if (oldStatus === SHIPMENT_STATUSES.assigned
            && !_.has(newData, 'biker_id')) {
            return SHIPMENT_STATUSES.waiting;
        }

        if (oldStatus === SHIPMENT_STATUSES.waiting
            && _.has(newData, 'biker_id')) {
            return SHIPMENT_STATUSES.assigned;
        }

        return null;
    }
}

module.exports = StatusHelper;
