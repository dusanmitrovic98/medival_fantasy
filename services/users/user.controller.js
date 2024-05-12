const User = require('../services/users/user.model.js');

/**
 * Retrieves all users from the database.
 *
 * @returns {Promise<User[]>} A promise that resolves to an array of User objects.
 * @throws {Error} If there is an error while retrieving users.
 */
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Retrieves a single user by their ID from the database.
 *
 * @param {string} userId - The ID of the user to retrieve.
 * @returns {Promise<User>} A promise that resolves to a User object.
 * @throws {Error} If there is an error while retrieving the user or if the user is not found.
 */
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Updates a user by their ID in the database.
 *
 * @param {string} userId - The ID of the user to update.
 * @param {Object} userData - The updated user data.
 * @returns {Promise<User>} A promise that resolves to the updated User object.
 * @throws {Error} If there is an error while updating the user or if the user is not found.
 */
const updateUserById = async (userId, userData) => {
  try {
    const user = await User.findByIdAndUpdate(userId, userData, {
      new: true,
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Deletes a user by their ID from the database.
 *
 * @param {string} userId - The ID of the user to delete.
 * @returns {Promise<User>} A promise that resolves to the deleted User object.
 * @throws {Error} If there is an error while deleting the user or if the user is not found.
 */
const deleteUserById = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Creates a new user in the database.
 *
 * @param {Object} userData - The user data to be saved.
 * @returns {Promise<User>} - A promise that resolves to the created user.
 * @throws {Error} - If there is an error while creating the user.
 */
const createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};