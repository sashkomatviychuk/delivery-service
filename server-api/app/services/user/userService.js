const CrudService = require('./../abstract/crudService');
const UserRepository = require('./../../repositories/users');
const { USER_ROLES } = require('./../roles/definitions');

class UserService extends CrudService {

    /**
     * @returns {Schema} 
     */
    getModel() {
        return User;
    }

    async getBikersList() {
        const bikers = await User.find({
            role: USER_ROLES.biker,
        }).lean().exec();

        if (!bikers) {
            return [];
        }

        return bikers.map(biker => {
            return {
                id: biker._id,
                name: `${biker.first_name} ${biker.last_name}`,
            };
        });
    }

    static async getBikersList() {
        const bikers = await UserRepository.getByRole(USER_ROLES.biker);

        if (!bikers) {
            return [];
        }

        return bikers;
    }
}

module.exports = UserService;
