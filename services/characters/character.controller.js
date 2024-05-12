const Character = require('../services/characters/character.model.js');

/**
 * Retrieves all characters from the database.
 *
 * @returns {Promise<Character[]>} A promise that resolves to an array of Character objects.
 * @throws {Error} If there is an error while retrieving characters.
 */
const getAllCharacters = async () => {
  try {
    const characters = await Character.find();
    return characters;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Retrieves a single character by their ID from the database.
 *
 * @param {string} characterId - The ID of the character to retrieve.
 * @returns {Promise<Character>} A promise that resolves to a Character object.
 * @throws {Error} If there is an error while retrieving the character or if the character is not found.
 */
const getCharacterById = async (characterId) => {
  try {
    const character = await Character.findById(characterId);
    if (!character) {
      throw new Error('Character not found');
    }
    return character;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Updates a character by their ID in the database.
 *
 * @param {string} characterId - The ID of the character to update.
 * @param {Object} characterData - The updated character data.
 * @returns {Promise<Character>} A promise that resolves to the updated Character object.
 * @throws {Error} If there is an error while updating the character or if the character is not found.
 */
const updateCharacterById = async (characterId, characterData) => {
  try {
    const character = await Character.findByIdAndUpdate(characterId, characterData, {
      new: true,
    });
    if (!character) {
      throw new Error('Character not found');
    }
    return character;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Deletes a character by their ID from the database.
 *
 * @param {string} characterId - The ID of the character to delete.
 * @returns {Promise<Character>} A promise that resolves to the deleted Character object.
 * @throws {Error} If there is an error while deleting the character or if the character is not found.
 */
const deleteCharacterById = async (characterId) => {
  try {
    const character = await Character.findByIdAndDelete(characterId);
    if (!character) {
      throw new Error('Character not found');
    }
    return character;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Creates a new character in the database.
 *
 * @param {Object} characterData - The character data to be saved.
 * @param {string} characterData.name - The name of the character.
 * @param {string} characterData.class - The class of the character.
 * @param {string} characterData.race - The race of the character.
 * @param {number} characterData.level - The level of the character.
 * @param {number} characterData.xp - The XP of the character.
 * @param {number} characterData.hp - The HP of the character.
 * @param {number} characterData.mp - The MP of the character.
 * @param {number} characterData.str - The STR of the character.
 * @param {number} characterData.dex - The DEX of the character.
 * @param {number} characterData.con - The CON of the character.
 * @param {number} characterData.int - The INT of the character.
 * @param {number} characterData.wis - The WIS of the character.
 * @param {number} characterData.cha - The CHA of the character.
 * @returns {Promise<Character>} A promise that resolves to the created character.
 * @throws {Error} If there is an error while creating the character.
 */
const createCharacter = async (characterData) => {
  try {
    const character = new Character(characterData);
    await character.save();
    return character;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllCharacters,
  getCharacterById,
  updateCharacterById,
  deleteCharacterById,
  createCharacter,
};
