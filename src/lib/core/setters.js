import { getCapitalizedString, getPrettifiedString } from '../utils.js';

/**
 * Create a generic setter given the context and the attribute key
 * @param {Object} context
 * @param {String} key
 */
export const populateSetter = (context, key) => {
    // First prettify the key
    const prettyKey = getCapitalizedString(getPrettifiedString(key));

    // Then create the generic setter for the current key
    context[`set${prettyKey}`] = (newValue) => (context[key] = newValue);
};
