const path = require('path');
const ChunkHashReplacePlugin = require('../');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
 
module.exports = {
  entry: {
    app: ['./sample/src/app.js'],
    vendor: ['./sample/src/vendor.js']
  },
  output: {
    path: path.join(__dirname, 'dist/static'),
    filename: '[name].[chunkhash].js',
    publicPath: '/static/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  plugins: [
    new ChunkHashReplacePlugin({
      src: './sample/index.html',
      dest: './sample/dist/index.html',
    }),
    new ExtractTextPlugin('[name].[chunkhash].css')
  ]
};