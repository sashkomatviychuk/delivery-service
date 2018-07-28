const CrudService = require('./../abstract/crudService');
const UserValidator = require('./userValidator');

class UserService extends CrudService {

    /**
     * @returns {Schema} 
     */
    getModel() {
        return User;
    }

    /**
     * @returns {UserValidator}
     */
    getValidator() {
        return new UserValidator();
    }
}

module.exports = UserService;
