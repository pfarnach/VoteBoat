const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const parts = require('./webpack/parts');
const vendorRegistry = require('./webpack/vendorRegistry');

const PATHS = {
  public: path.join(__dirname, 'public'),
  dist: path.join(__dirname, 'public', 'dist'),
  globalStyles: path.join(__dirname, 'public', 'src', 'style')
};

const config = {
  entry: {
    app: './public/index.js',
    vendor: vendorRegistry
  },

  output: {
    path: PATHS.dist,
    filename: '[name].js'
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

    new HtmlWebpackPlugin({
      template: 'public/index.html'
    })
  ]
};

function makeConfig() {
  switch(process.env.npm_lifecycle_event) {
    // PRODUCTION
    case 'build':
      return merge(
        config,
        parts.babel(),
        parts.definePlugin(true),
        parts.sourceMap(true),
        parts.css(PATHS.public, PATHS.globalStyles),
        parts.minify()
      );

    // DEVELOPMENT
    default:
      return merge(
        config,
        parts.babel(),
        parts.definePlugin(false),
        parts.sourceMap(false),
        parts.css(PATHS.public, PATHS.globalStyles)
      );
  }
}

module.exports = makeConfig();
