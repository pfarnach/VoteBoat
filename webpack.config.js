const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

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
  }
};

function makeConfig() {
  switch(process.env.npm_lifecycle_event) {
    // PRODUCTION
    case 'build':
      return merge(
        config,
        parts.babel(),
        parts.commonsChunk(),
        parts.htmlPlugin(),
        parts.definePlugin(true),
        parts.resolve(),
        parts.sourceMap(true),
        parts.css(PATHS.public, PATHS.globalStyles),
        parts.minify()
      );

    // DEVELOPMENT
    default:
      return merge(
        config,
        parts.babel(),
        parts.commonsChunk(),
        parts.htmlPlugin(),
        parts.definePlugin(false),
        parts.resolve(),
        parts.sourceMap(false),
        parts.css(PATHS.public, PATHS.globalStyles)
      );
  }
}

module.exports = makeConfig();
