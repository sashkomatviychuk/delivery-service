class UserRepository {
  /**
   * Returns list of users with role
   * @param role
   * @returns {Promise}
   */
  static async getByRole(role) {
    return User.find({ role }).lean().exec();
  }
}

module.exports = UserRepository;
