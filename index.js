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
        const {
          hash,
          files,
          names,
        } = chunk;
        const bundleName = names[0];
        files.forEach(file => {
          const extension = file.split('.').slice(-1).join('');
          const fileName = file
            .split(hash)
            .join('')
            .split('.')
            .slice(0, -1)
            .join('')
            .replace(/[^a-z0-9]/gi, ''); // TODO: Make this more rigid
          let regex = null;

          // TODO: Fix this for a more light search for the tag
          switch(extension) {
            case 'js': {
              regex = new RegExp(`(<script\\s+src=["'].*)(${fileName}\\.js)(["'] type="text/javascript"><\/script>)`, 'i');
              break;
            }
            case 'css': {
              regex = new RegExp(`(<link\\s+href=["'].*)(${fileName}\\.css)(["'] rel="stylesheet">)`, 'i');
              break;
            }
            default: {
              return;
            }
          }

          htmlOutput = htmlOutput.replace(regex, `$1${file}$3`);
        });
      }

      fs.writeFile(dest, htmlOutput);
    });
  });
};

module.exports = ChunkHashReplacePlugin;