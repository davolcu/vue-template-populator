// Core imports
import { populateSetter } from './core/setters.js';
import { populateBooleanGetter, populateQuickAccessGetters } from './core/getters.js';
// Custom imports
import { constants } from './constants.js';
import { getPropType } from './utils.js';

// Default export for the Vue Populator
const vuePopulator = (context, config) => {
    const { $data: data } = context ?? {};
    if (!data || typeof data !== 'object' || Array.isArray(data)) return;

    // Loop over the data properties of the Vue context
    Object.keys(data).forEach((key) => {
        const value = context[key];
        const propType = getPropType(value);

        // Create the setter for the current key
        populateSetter(context, key, config);

        // Create the boolean getter for the current key
        populateBooleanGetter(context, key);

        if (value && propType === constants.OBJECT_PROP_TYPE) {
            // Create a series of getters for nested object attributes
            populateQuickAccessGetters(context, key);
        }
    });
};

export default vuePopulator;
