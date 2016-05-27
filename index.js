'use strict';

var path = require('path');
var fs = require('fs');

function ChunkHashReplacePlugin(options) {
  this.src = options.src;
  this.dest = options.dest;
}

ChunkHashReplacePlugin.prototype.apply = function(compiler) {
  var self = this;
  var folder = compiler.options.context;
  var src = path.join(folder, self.src);
  var dest = path.join(folder, self.dest);

  fs.readFile(src, 'utf8', function(err, data) {
    compiler.plugin('done', function(statsData) {
      const stats = statsData.toJson();
      const template = fs.readFileSync(src, 'utf8');

      let htmlOutput = template;
      for (let chunk of stats.chunks) {
        const bundleName = chunk.names[0];
        const chunkHashFileName = chunk.files[0];
        const regex = new RegExp(`(<script\\s+src=["'].*)(${bundleName}\\.js)(["']><\/script>)`, 'i');
        htmlOutput = htmlOutput.replace(regex, `$1${chunkHashFileName}$3`);
      }

      fs.writeFile(dest, htmlOutput);
    });
  });
};

module.exports = ChunkHashReplacePlugin;
