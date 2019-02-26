const path = require('path');
const toml = require('toml');
const { promisify } = require('util');
const fs = require('fs');
const read = promisify(fs.readFile);

/**
 * Return the wrhs.toml at a given path, or an empty object if no file exists
 * @param  {String}   repo     path to repo
 * @returns {Promise} completion handler
 */
module.exports = async function (repo) {
  const file = path.join(repo, 'wrhs.toml');
  let data = {};
  try {
    data = await read(file);
  } catch (err) {

    // the file does not exist, which is fine
    if (err.code === 'ENOENT') {
      return { };
    }

    throw err;
  }

  return toml.parse(data);
};
