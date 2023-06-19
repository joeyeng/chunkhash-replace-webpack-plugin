'use strict';

const path = require('path');
const fs = require('fs');
const transform = require('./transform');

class ChunkHashReplacePlugin {
  constructor(options) {
    this.src = options.src;
    this.dest = options.dest;
  }

  apply(compiler) {
    const self = this;
    const folder = compiler.options.context;
    const src = path.join(folder, self.src);
    const dest = path.join(folder, self.dest);

    compiler.hooks.done.tap('ChunkHashReplacePlugin', (statsData) => {
      const stats = statsData.toJson();
      const template = fs.readFileSync(src, 'utf8');
      const htmlOutput = transform(template, stats.chunks);
      fs.writeFileSync(dest, htmlOutput);
    });
  }
}

module.exports = ChunkHashReplacePlugin;
