import { populateSetter } from './core/setters.js';
import { populateBooleanGetter } from './core/getters.js';

// Default export for the Vue Populator
const vuePopulator = (context, config) => {
    const { $data: data } = context ?? {};
    if (!data || typeof data !== 'object' || Array.isArray(data)) return;

    // Loop over the data properties of the Vue context
    Object.keys(data).forEach((key) => {
        // Create the setter for the current key
        populateSetter(context, key, config);
        // Create the boolean getter for the current key
        populateBooleanGetter(context, key);
    });
};

export default vuePopulator;
