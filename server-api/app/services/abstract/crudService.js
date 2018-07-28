const ObjectId = require('mongoose').Types.ObjectId;

class CrudService {

    constructor() {
        this.DEFAULT_ENTITIES_LIMIT = 10;
    }

    /**
     * Get entity service model
     */
    getModel() {
        throw new Error(`Class ${this.constructor.name} must override method getModel`);
    }

    /**
     * Data validator, null by default
     */
    getValidator() {
        return null;
    }

    /**
     * @param {String} id
     */
    async findById(id) {
        if (!ObjectId.isValid(id)) {
            return null;
        }

        return await this.getModel()
            .findOne({ _id: ObjectId(id)})
            .exec();
    }

    /**
     * Returns paginated list of entities
     * @param {Object} filter
     * @param {Object} options
     * @returns {Array}
     */
    async getPaginatedList(filter, options) {
        const model = this.getModel();
        const page = parseInt(options.page) || 1;
        const limit = parseInt(options.limit) || this.DEFAULT_ENTITIES_LIMIT;
        const skip = (page - 1) * limit;

        return await model
            .find(filter || {})
            .sort({ _id: -1 })
            .limit(limit)
            .skip(skip)
            .lean()
            .exec();
    }

    /**
     * Creates new model entity
     * @param {Object} data
     */
    async create(data) {
        const model = this.getModel();
        const validator = this.getValidator();

        if (validator) {
            const error = validator.validate(data);

            if (error) {
                throw new Error(error);
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
     * Updates document with provided id
     * @param {Object} data
     * @param {ObjectId} id
     */
    async update(data, id) {
        const model = this.getModel();
        const validator = this.getValidator();

        if (validator) {
            const error = validator.validate(data);

            if (error) {
                throw new Error(error);
            }
        }

        try {
            await model.update({ _id: id }, { $set: data });
        } catch (err) {
            throw err;
        }
    }

    /**
     * Removes document with provided id
     * @param {ObjectId} id
     */
    async remove(id) {
        const model = this.getModel();

        try {
            const doc = await model.findOne({ _id: id }).exec();

            if (!doc) {
                throw new Error(`Document with id ${id} not exists`);
            }

            await doc.remove();
        } catch (err) {
            throw err;
        }
    }
}

module.exports = CrudService;