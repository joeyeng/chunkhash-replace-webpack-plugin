Chunkhash Replace Webpack Plugin
================================
The latest release adds support for webpack users who prefer to extract styles out of their js bundle into a separate css file, using a tool like [ExtractTextPlugin](https://www.npmjs.com/package/extract-text-webpack-plugin).

**Tip**: Just use this plugin for your production/staging builds.

## Installation
```shell
$ npm install chunkhash-replace-webpack-plugin --save-dev
```

## Example

###Webpack.config.js

```javascript
const path = require('path');
const ChunkHashReplacePlugin = require('chunkhash-replace-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: ['./src/main.js'],
    vendor: ['jquery', 'lodash', 'react', 'react-dom']
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
      src: 'index.html',
      dest: 'dist/index.html',
    }),
    new ExtractTextPlugin('[name].[chunkhash].css')
  ]
};
```
###HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <link href="app.css" rel="stylesheet">
</head>
<body>
  <script src="/static/vendor.js"></script>
  <script src="/static/app.js"></script>
</body>
</html>
```

###Output

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <link href="app.bc9412b20a3d196ac0eb.css" rel="stylesheet">
</head>
<body>
  <script src="/static/vendor.8c670c84b126bbde6319.js"></script>
  <script src="/static/app.bc9412b20a3d196ac0eb.js"></script>
</body>
</html>
```