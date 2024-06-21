const path = require('path');

module.exports = {
  mode: 'development',
  entry: './demo/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'demo'),
  },
};
