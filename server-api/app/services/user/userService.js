const CrudService = require('./../abstract/crudService');
const UserValidator = require('./userValidator');

const { USER_ROLES } = require('./../roles/definitions');

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

    async getBikersList() {
        return await User.find({
            role: USER_ROLES.biker,
        }).lean().exec();
    }
}

module.exports = UserService;
