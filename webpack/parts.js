const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

exports.definePlugin = function definePlugin(isProd) {
  return {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(isProd ? 'production' : 'development')
        }
      })
    ]
  };
};

exports.commonsChunk = function commonsChunk() {
  return {
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      })
    ]
  };
};

exports.htmlPlugin = function htmlPlugin() {
  return {
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html'
      })
    ]
  };
};

exports.babel = function babel() {
  return {
    module: {
      rules: [
        {
          use: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/
        }
      ]
    }
  };
};

exports.resolve = function() {
  return {
    resolve: {
      extensions: ['.js'],
      alias: {
        utils: path.resolve(__dirname, '../public/src/style/utils')
      }
    }
  };
};

exports.sourceMap = function sourceMap(isProd) {
  // Options: https://webpack.github.io/docs/configuration.html
  return {
    devtool: isProd ? 'source-map' : 'cheap-eval-source-map'
  };
};

exports.minify = function minify() {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      })
    ]
  };
};

exports.css = function css(srcPath, globalStylesPath) {
  return {
    module: {
      rules: [
        // CSS modules
        {
          test: /\.(sa|sc|c)ss?/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: getStyleLoaders(false)
          }),
          include: srcPath,
          exclude: globalStylesPath
        },

        // To generate global class names that aren't hashed by CSS modules
        {
          test: /\.(sa|sc|c)ss?/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: getStyleLoaders(true)
          }),
          include: globalStylesPath
        }
      ]
    },
    plugins: [
      // Output extracted CSS to a file (not sure if allChunks flag is necessary)
      new ExtractTextPlugin({ filename: 'main.css', allChunks: true })
    ]
  };
};

function getStyleLoaders(isGlobalStyles) {
  return [
    {
      loader: 'css-loader',
      options: isGlobalStyles ? {} : {
        sourceMap: true,
        modules: true,
        importLoaders: 2,
        camelCase: true,
        localIdentName: '[name]__[local]__[hash:base64:5]'
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => [autoprefixer()]
      }
    },
    {
      loader: 'sass-loader',
      options: isGlobalStyles ? {} : { sourceMap: true }
    }
  ];
}
