import { getCapitalizedString, getPrettifiedString } from '../utils.js';

/**
 * Create a boolean getter given the context and the attribute key
 * @param {Object} context
 * @param {String} key
 */
export const populateBooleanGetter = (context, key) => {
    // First prettify the key
    const prettyKey = getCapitalizedString(getPrettifiedString(key));

    // Then create the boolean getter
    Object.defineProperty(context, `has${prettyKey}`, {
        get() {
            return !!context[key];
        },
    });
};
