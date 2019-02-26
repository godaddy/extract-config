const path = require('path');
const { promisify } = require('util');
const fs = require('fs');
const read = promisify(fs.readFile);

/**
 * Return the .wrhsrc at a given path, or an empty object if no file exists
 * @param  {String}   repo     path to repo
 * @returns {Promise} completion handler
 */
module.exports = async function (repo) {
  const file = path.join(repo, '.wrhsrc');

  let data = {};
  try {
    data = await read(file, 'utf8');
  } catch (err) {
    // the file does not exist, which is fine
    if (err.code === 'ENOENT') {
      return data;
    }

    // there was an issue reading the file
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }

  return JSON.parse(data);
};
