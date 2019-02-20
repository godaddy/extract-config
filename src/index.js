const async = require('async');

const wrhsrcParse = require('./wrhsrc');
const pkgParse = require('./package');
const tomlParse = require('./toml');

/**
 * Generate a standard Warehouse.ai configuration from a given unpacked directory.
 *
 * @param  {String} repo path to unpacked packages
 * @param  {Function} callback completion handler
 */
module.exports = function generate(repo, callback) {
  async.parallel([
    cb => wrhsrcParse(repo, cb),
    cb => pkgParse(repo, cb),
    cb => tomlParse(repo, cb)
  ], (err, [wrhsrc, json, toml]) => {
    if (err) {
      return callback(err);
    }

    const merged = {
      ...toml, // toml file
      ...json, // package.json
      ...wrhsrc // .wrhsrc
    };

    callback(null, merged);
  });
};
