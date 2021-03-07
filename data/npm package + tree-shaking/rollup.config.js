import fs from 'fs';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const plugins = [resolve(), commonjs()];

export default fs.readdirSync(`${__dirname}/src`).map(file => ({
  input: `src/${file}`,
  output: {
    file: `dist/rollup-${file}`,
    format: 'iife',
  },
  plugins,
}));
