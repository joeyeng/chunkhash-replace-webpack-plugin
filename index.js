'use strict';

const path = require('path');
const fs = require('fs');
const loaderUtils = require('loader-utils');
const transform = require('./transform');

function ChunkHashReplacePlugin(options) {
  this.src = options.src;
  this.dest = options.dest;
}

ChunkHashReplacePlugin.prototype.apply = function (compiler) {
  const self = this;
  const folder = compiler.options.context;
  const src = path.join(folder, self.src);
  const dest = path.join(folder, self.dest);
  const cssFilePaths = self.cssFilePaths;

  fs.readFile(src, 'utf8', function (err, data) {
    compiler.plugin('done', function (statsData) {
      const stats = statsData.toJson();
      const template = fs.readFileSync(src, 'utf8');
      const htmlOutput = transform(template, stats.chunks);
      fs.writeFileSync(dest, htmlOutput);
    });
  });
};

module.exports = ChunkHashReplacePlugin;
