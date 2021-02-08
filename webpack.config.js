const Dotenv = require('dotenv-webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const glob = require('glob');

const sources = glob.sync('./src/**/*.js', { ignore: './src/**/_*.js' });
const entries = sources.reduce((r, c) => {
  r[c.replace(/.*\/(.*)\.js$/g, '$1')] = c;
  return r;
}, {});

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: entries,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new UglifyJSPlugin({
      uglifyOptions: {
        output: {
          comments: false,
        },
      },
    }),
  ],
};
