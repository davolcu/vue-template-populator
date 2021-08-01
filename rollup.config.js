// Rollup plugins
import includePaths from 'rollup-plugin-includepaths';
import { terser } from 'rollup-plugin-terser';

// Output point from package.json
import { main } from './package.json';

// Options for the include path plugin
const includePathOptions = {
    include: {},
    paths: ['src'],
    external: [],
    extensions: ['.js'],
};

export default {
    input: 'src/index.js',
    output: [
        {
            file: main,
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
            strict: false,
        },
    ],
    plugins: [includePaths(includePathOptions), terser()],
};
