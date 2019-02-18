const async = require('async');

const wrhsrc = require('./wrhsrc');
const pkg = require('./package');
const toml = require('./toml');

/**
 * Generate a standard Warehouse.ai configuration from a given unpacked directory.
 *
 * @param  {String} repo path to unpacked packages
 * @param  {Function} callback completion handler
 */
module.exports = function generate(repo, callback) {
  async.parallel([
    cb => wrhsrc(repo, cb),
    cb => pkg(repo, cb),
    cb => toml(repo, cb)
  ], (err, [rc, json, wrhs]) => {
    if (err) {
      throw err;
    }

    const merged = {
      ...wrhs, // toml file
      ...json, // package.json
      ...rc // .wrhsrc
    };

    callback(null, merged);
  });
};
