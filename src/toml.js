const fs = require('fs');
const path = require('path');
const toml = require('toml');

/**
 * Return the wrhs.toml at a given path, or an empty object if no file exists
 * @param  {String}   repo     path to repo
 * @returns {Promise} completion handler
 */
module.exports = function (repo) {
  return new Promise((resolve, reject) => {
    const file = path.join(repo, 'wrhs.toml');
    fs.readFile(file, 'utf8', (err, data) => {
      // there was an issue with reading the file
      if (err && err.code !== 'ENOENT') {
        return reject(err);
      }

      // the file does not exist, which is fine
      if (err && err.code === 'ENOENT') {
        return resolve({});
      }

      let parsed = {};
      try {
        parsed = toml.parse(data);
      } catch (e) {
        return reject(err);
      }

      // the file does exist
      resolve(parsed);
    });
  });
};
