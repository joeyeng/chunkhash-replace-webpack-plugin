Chunkhash Replace Webpack Plugin
================================
**Tip**: Just use this plugin for your production/staging builds.

## Installation
```shell
$ npm install chunkhash-replace-webpack-plugin --save-dev
```

## Example

###Webpack.config.js

```javascript
var ChunkHashReplacePlugin = require('chunkhash-replace-webpack-plugin');

module.exports = {
  entry: {
    app: ['./src/main.js'],
    vendor: ['jquery', 'lodash', 'react', 'react-dom']
  },
  output: {
    filename: '[name].[chunkhash].js',
    publicPath: 'static',
  },
  plugins: [
    new ChunkHashReplacePlugin({
      src: 'index.html',
      dest: 'dist/index.html',
    })
  ]
};
```
###HTML

```html
<!DOCTYPE html>
<html lang="en">
<head></head>
<body>
  <script src="static/vendor.js"></script>
  <script src="static/app.js"></script>
</body>
</html>
```

###Output

```html
<!DOCTYPE html>
<html lang="en">
<head></head>
<body>
  <script src="static/vendor.8c670c84b126bbde6319.js"></script>
  <script src="static/app.bc9412b20a3d196ac0eb.js"></script>
</body>
</html>
```
