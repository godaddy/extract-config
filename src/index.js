const wrhsrcParse = require('./wrhsrc');
const pkgParse = require('./package');
const tomlParse = require('./toml');

/**
 * Generate a standard Warehouse.ai configuration from a given unpacked directory.
 *
 * @param  {String} repo path to unpacked packages
 * @returns {Promise} completion handler
 */
module.exports = async function generate(repo) {
  const [wrhsrc, json, toml] = await Promise.all([
    wrhsrcParse(repo),
    pkgParse(repo),
    tomlParse(repo)
  ]);

  const merged = {
    ...toml, // toml file
    ...json, // package.json
    ...wrhsrc // .wrhsrc
  };

  return merged;
};
