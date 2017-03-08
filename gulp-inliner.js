var through = require('through2');
var Inliner = require('inliner');

module.exports = function() {
  return through.obj(function(file, encoding, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }

    if (file.isStream()) {
      // file.contents is a Stream - https://nodejs.org/api/stream.html
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
    } else if (file.isBuffer()) {
      var content = String(file.contents);
      new Inliner(content, function (error, result) {
        file.contents = new Buffer(result)
        callback(null, file);
      });
    }

  });
};
