const { v4: uuidv4 } = require('uuid');

/**
 * Generates a random UUID (Universally Unique Identifier) using the v4 algorithm.
 *
 * @function generateRandomId
 * @returns {string} A random UUID.
 *
 * @example
 * const randomId = generateRandomId();
 * console.log(randomId); // Output: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
 */
function generateRandomId() {
    const id = uuidv4();

    return id;
}

module.exports = generateRandomId;