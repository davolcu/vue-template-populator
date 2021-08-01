import { getCapitalizedString, getPrettifiedString } from './utils.js';

// Default export for the Vue Populator
const vuePopulator = (context) => {
    const { $data: data } = context ?? {};
    if (!data || typeof data !== 'object' || Array.isArray(data)) return;

    // Loop over the data properties of the Vue context
    Object.keys(data).forEach((key) => {
        // First prettify the key
        const prettyKey = getCapitalizedString(getPrettifiedString(key));
        // Then prepare the requiered methods and computed properties

        // Create the setter for the current key
        context[`set${prettyKey}`] = (newValue) => (context[key] = newValue);
        // Create the boolean getter for the current key
        Object.defineProperty(context, `has${prettyKey}`, {
            get() {
                return !!context[key];
            },
        });
    });
};

export default vuePopulator;
