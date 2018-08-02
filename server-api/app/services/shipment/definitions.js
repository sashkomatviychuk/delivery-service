const DISCOUNT_TYPES = {
    amount: 'amount',
    percentage: 'percentage',
};

const SHIPMENT_STATUSES = {
    waiting: 'waiting',
    assigned: 'assigned',
    picked_up: 'picked_up',
    delivered: 'delivered',
};

const SHIPMENT_STATUSES_TITLES = {
    [SHIPMENT_STATUSES.waiting]: 'Waiting',
    [SHIPMENT_STATUSES.assigned]: 'Assigned',
    [SHIPMENT_STATUSES.picked_up]: 'Picked up',
    [SHIPMENT_STATUSES.delivered]: 'Delivered',
};

module.exports = {
    DISCOUNT_TYPES,
    SHIPMENT_STATUSES,
    SHIPMENT_STATUSES_TITLES,
};
