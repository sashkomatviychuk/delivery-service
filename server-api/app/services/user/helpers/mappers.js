/**
 * Returns mapped user data for select box
 * @param {object} user
 * @returns {{name: string, id: *}}
 */
function mapUserForSelect(user) {
  return {
    id: user._id,
    name: `${user.first_name} ${user.last_name}`,
  };
}

/**
 * Returns mapped array of users
 * @param {object[]} users
 * @returns {object[]}
 */
function mapUsersForSelect(users) {
  return users.map(mapUserForSelect);
}

module.exports = {
  mapUsersForSelect
};
