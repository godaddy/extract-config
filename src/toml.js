const fs = require('fs');
const path = require('path');
const toml = require('toml');

/**
 * Return the wrhs.toml at a given path, or an empty object if no file exists
 * @param  {String}   repo     path to repo
 * @param  {Function} callback completion handler
 */
module.exports = function (repo, callback) {
  const file = path.join(repo, 'wrhs.toml');
  fs.readFile(file, 'utf8', (err, data) => {
    // there was an issue with reading the file
    if (err && err.code !== 'ENOENT') {
      return callback(err);
    }

    // the file does not exist
    if (err && err.code === 'ENOENT') {
      return callback(null, {});
    }

    let parsed = {};
    try {
      parsed = toml.parse(data);
    } catch (e) {
      return callback(e.message);
    }

    // the file does exist
    callback(null, parsed);
  });
};
