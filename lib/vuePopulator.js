import { getCapitalizedString, getPrettifiedString } from './utils.js';

// Default export for the Vue Populator
const vuePopulator = (context) => {
    const { $data: data } = context ?? {};
    if (!data || typeof data !== 'object' || Array.isArray(data)) return;

    Object.entries(data).forEach(([key, value]) => {
        // First prettify the key
        const prettyKey = getCapitalizedString(getPrettifiedString(key));

        // Create the setter for the current key
        context[`set${prettyKey}`] = (newValue) => (context[key] = newValue);
        // Create the boolean getter for the current key
        Object.defineProperty(context, `has${prettyKey}`, {
            get() {
                return !!value;
            },
        });
    });
};

export default vuePopulator;
