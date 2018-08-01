const { USER_ROLES } = require('./../roles/definitions');
const { SHIPMENT_STATUSES } = require('./../shipment/definitions');

module.exports = {
    [USER_ROLES.shipper]: {
        [SHIPMENT_STATUSES.waiting]: [
            'title',
            'cost',
            'origin_address',
            'destination_address',
        ],
        [SHIPMENT_STATUSES.assigned]: [
            'title',
        ],
        [SHIPMENT_STATUSES.picked_up]: [
            'title',
        ],
        [SHIPMENT_STATUSES.delivered]: [
            'title',
        ],
    },
    [USER_ROLES.biker]: {
        [SHIPMENT_STATUSES.assigned]: [
            'picked_at',
        ],
        [SHIPMENT_STATUSES.picked_up]: [
            'delivered_at'
        ],
    },
    [USER_ROLES.manager]: {
        [SHIPMENT_STATUSES.waiting]: [
            'biker_id',
            'discount_type',
            'discount_value',
        ],
        [SHIPMENT_STATUSES.assigned]: [
            'biker_id',
            'discount_type',
            'discount_value',
        ],
    },
};