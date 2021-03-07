const fs = require('fs');
const path = require('path');

const dist = path.resolve(__dirname, 'dist');

module.exports = fs.readdirSync(`${__dirname}/src`).map(file => ({
  entry: `./src/${file}`,
  output: {
    filename: `webpack-${file}`,
    path: dist,
  },
  mode: 'development',
  devtool: false,
}));
