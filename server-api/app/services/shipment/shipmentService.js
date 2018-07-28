const CrudService = require('./../abstract/crudService');
const ShipmentValidator = require('./shipmentValidator');

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
}

module.exports = ShipmentService;
