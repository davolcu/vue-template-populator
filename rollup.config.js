// Rollup plugins
import includePaths from 'rollup-plugin-includepaths';
import { babel } from '@rollup/plugin-babel';
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
            format: 'esm',
            exports: 'named',
            sourcemap: true,
            strict: true,
        },
    ],
    plugins: [includePaths(includePathOptions), babel({ babelHelpers: 'bundled' }), terser()],
};
