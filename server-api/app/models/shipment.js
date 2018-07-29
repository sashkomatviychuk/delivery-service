const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const { DISCOUNT_TYPES, SHIPMENT_STATUSES } = require('./../services/shipment/definitions');

const ShipmentSchema = mongoose.Schema({
    shipper_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    biker_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        max: 255,
    },
    origin_address: {
        type: String,
        max: 255,
    },
    destination_address: {
        type: String,
        max: 255,
    },
    cost: {
        type: Number,
    },
    discount_type: {
        type: String,
        enum: [
            DISCOUNT_TYPES.amount,
            DISCOUNT_TYPES.percentage,
        ],
        default: null,
    },
    discount_value: {
        type: Number,
        default: null,
    },
    status: {
        type: String,
        enum: [
            SHIPMENT_STATUSES.waiting,
            SHIPMENT_STATUSES.assigned,
            SHIPMENT_STATUSES.picked_up,
            SHIPMENT_STATUSES.delivered,
        ],
        default: SHIPMENT_STATUSES.waiting,
    },
    picked_at: {
        type: Date,
    },
    delivered_at: {
        type: Date,
    },
}, {
    collection: 'shipments',
});

ShipmentSchema.plugin(timestamps, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

ShipmentSchema.pre('save', function (next) {
    if (this.status === SHIPMENT_STATUSES.assigned && this.picked_at) {
        this.status = SHIPMENT_STATUSES.picked_up;
    } else if (this.status === SHIPMENT_STATUSES.picked_up && this.delivered_at) {
        this.status = SHIPMENT_STATUSES.delivered;
    } else if (this.status === SHIPMENT_STATUSES.waiting && this.biker_id) {
        this.status = SHIPMENT_STATUSES.assigned;
    } else if (this.status === SHIPMENT_STATUSES.assigned && !this.biker_id) {
        this.status = SHIPMENT_STATUSES.waiting;
    }

    next();
});

const Shipment = mongoose.model('Shipment', ShipmentSchema);

global.Shipment = Shipment;

module.exports = Shipment;