const parseWrhsrc = require('./wrhsrc');
const parsePackage = require('./package');
const parseToml = require('./toml');

/**
 * Generate a standard Warehouse.ai configuration from a given unpacked directory.
 *
 * @param  {String} repo path to unpacked packages
 * @returns {Promise} completion handler
 */
module.exports = async function generate(repo) {
  const [wrhsrc, json, toml] = await Promise.all([
    parseWrhsrc(repo),
    parsePackage(repo),
    parseToml(repo)
  ]);

  // Warehouse.ai config in descending order of precedence
  const merged = {
    ...toml, // toml file
    ...json.config, // package.json.wrhs
    ...wrhsrc // .wrhsrc
  };

  return {
    pkg: { ...json.package }, // the original package.json
    wrhs: { ...merged } // the warehouse.ai - specific configuration
  };
};
