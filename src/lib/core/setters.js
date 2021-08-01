import { getCapitalizedString, getPrettifiedString, getPropType, getFallbackValue } from '../utils.js';

/**
 * Create a generic setter given the context and the attribute key
 * @param {VueComponent} context
 * @param {String} key
 * @param {Object} config
 */
export const populateSetter = (context, key, config) => {
    // Prettify the key
    const prettyKey = getCapitalizedString(getPrettifiedString(key));
    // Get the type of the prop to generate the fallback value
    const propType = getPropType(context[key]);
    const fallbackValue = getFallbackValue(propType, config);

    // Then create the generic setter for the current key
    context[`set${prettyKey}`] = (newValue = fallbackValue) => (context[key] = newValue);
};
