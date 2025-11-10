const path = require('path');

module.exports = {
  mode: 'development',
  entry: './docs/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs'),
  },
};
