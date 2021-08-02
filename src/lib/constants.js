export const constants = {
    // List of chars to check during prettify process
    PRETTIFY_CHARS_TO_CHECK: ['-', '_'],
    // Map for the types fallback values on set
    TYPE_FALLBACK_MAP: {
        string: '',
        number: 0,
        boolean: false,
        array: [],
        object: null,
        undefined,
    },
    ARRAY_PROP_TYPE: 'array',
    OBJECT_PROP_TYPE: 'object',
};

export default constants;
