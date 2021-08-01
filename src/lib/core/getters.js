import { constants } from '../constants.js';
import { getCapitalizedString, getPrettifiedString, getPropType } from '../utils.js';

/**
 * Create a generic boolean getter function given the context, the name and the attribute key
 * @param {VueComponent} context
 * @param {String} name
 * @param {String} key
 */
const getGenericBooleanGetter = (context, name, key) => {
    Object.defineProperty(context, name, {
        get() {
            return !!context[key];
        },
    });
};

/**
 * Create a boolean getter function for an array given the context, the name and the attribute key
 * @param {VueComponent} context
 * @param {String} name
 * @param {String} key
 */
const getArrayBooleanGetter = (context, name, key) => {
    Object.defineProperty(context, name, {
        get() {
            return !!context[key]?.length;
        },
    });
};

/**
 * Create a boolean getter given the context and the attribute key
 * @param {VueComponent} context
 * @param {String} key
 */
export const populateBooleanGetter = (context, key) => {
    // Prettify the key and generate the name of the function
    const prettyKey = getCapitalizedString(getPrettifiedString(key));
    const name = `has${prettyKey}`;
    // Get the type of the prop
    const propType = getPropType(context[key]);

    if (propType === constants.ARRAY_PROP_TYPE) {
        // Then create the getter for the array
        getArrayBooleanGetter(context, name, key);
        return;
    }

    // Create the generic boolean getter
    getGenericBooleanGetter(context, name, key);
};
