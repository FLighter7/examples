import fs from 'fs';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

/**
 * If you test a local npm library and want to know if it's tree-shakeable:
 * Make sure this module is included into "dependencies" in the package.json
 * Otherwise, it will be included as an external dependency
 */
const plugins = [resolve(), commonjs()];

export default fs.readdirSync(`${__dirname}/src`).map(file => ({
  input: `src/${file}`,
  output: {
    file: `dist/rollup-${file}`,
    format: 'iife',
  },
  plugins,
}));
