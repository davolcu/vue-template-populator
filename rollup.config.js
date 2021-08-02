// Rollup plugins
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

// Output point from package.json
import { main, global, module } from './package.json';

export default {
    input: 'src/index.js',
    output: [
        {
            file: main,
            format: 'umd',
            exports: 'named',
            name: global,
        },
        {
            file: module,
            format: 'esm',
        },
    ],
    plugins: [babel({ exclude: 'node_modules/**', presets: ['@babel/preset-env'] }), terser()],
};
