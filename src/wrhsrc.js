const fs = require('fs');
const path = require('path');

/**
 * Return the .wrhsrc at a given path, or an empty object if no file exists
 * @param  {String}   repo     path to repo
 * @returns {Promise} completion handler
 */
module.exports = function (repo) {
  return new Promise((resolve, reject) => {
    const file = path.join(repo, '.wrhsrc');
    fs.readFile(file, 'utf8', (err, data) => {
      // there was an issue with reading the file
      if (err && err.code !== 'ENOENT') {
        return reject(err);
      }

      // the file does not exist, which is fine
      if (err && err.code === 'ENOENT') {
        return resolve({});
      }

      // the file does exist
      let parsed = {};
      try {
        parsed = JSON.parse(data);
      } catch (e) {
        // file is malformed JSON
        return reject(e);
      }

      resolve(parsed);
    });
  });
};
