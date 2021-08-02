// Custom imports
import { constants } from './constants.js';

/**
 * Returns the first character of a given string
 * @param {String} value
 */
export const getStringFirstChar = (value) => {
    if (!value) return '';
    return value.charAt(0);
};

/**
 * Returns the capitalized value of the given value
 * @param {Any} value
 */
export const getCapitalizedString = (value) => {
    if (!value) return '';

    const stringifiedValue = value.toString();
    return getStringFirstChar(stringifiedValue).toUpperCase() + stringifiedValue.slice(1);
};

/**
 * Returns the prettiefied value of the given value. It means removing all the dashes and underscores found
 * @param {Any} value
 */
export const getPrettifiedString = (value) => {
    if (!value) return '';

    const stringifiedValue = value.toString();
    const { PRETTIFY_CHARS_TO_CHECK: prettifyChars } = constants;

    return prettifyChars.reduce((acc, char) => {
        const firstCharMatch = acc.startsWith(char);
        const splittedValue = acc.split(char);

        if (firstCharMatch || splittedValue.length > 1) {
            splittedValue.forEach((partialValue, index) => {
                if ((!index && !firstCharMatch) || !partialValue) return;
                splittedValue[index] = getStringFirstChar(partialValue).toUpperCase() + partialValue.slice(1);
            });
        }

        return splittedValue.join('');
    }, stringifiedValue);
};

/**
 * Returns the type of the prop given its value
 * @param {any} value
 */
export const getPropType = (value) => {
    return Array.isArray(value) ? constants.ARRAY_PROP_TYPE : typeof value;
};

/**
 * Returns the fallback value for the prop given its type
 * @param {String} type
 * @param {Object} config
 */
export const getFallbackValue = (type, config) => {
    const fallbackValue = constants.TYPE_FALLBACK_MAP[type];

    // If there's no custom config then return the value
    if (!config?.overrideFallbackMap) {
        return fallbackValue;
    }

    const overridenTypes = Object.keys(config.overrideFallbackMap);

    // If the current type hasn't been override then return the value
    if (!overridenTypes.includes(type)) {
        return fallbackValue;
    }

    return config.overrideFallbackMap[type];
};
