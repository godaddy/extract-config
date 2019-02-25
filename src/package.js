const fs = require('fs');
const path = require('path');

/**
 * Return the package.json at a given path, or an empty object if no file exists
 * @param  {String}   repo     path to repo
 * @returns {Promise} completion handler
 */
module.exports = function (repo) {
  return new Promise((resolve, reject) => {
    const file = path.join(repo, 'package.json');
    fs.readFile(file, 'utf8', (err, data) => {
      // there was an issue with reading the file
      if (err) {
        return reject(err);
      }

      let parsed = {};
      try {
        parsed = JSON.parse(data);
      } catch (e) {
        // there was an error parsing the package.json
        return reject(e);
      }

      // the only fields we care about are `build`, `locales`, and `wrhs`,
      // so we extract them out to one merged object.
      const { build, locales, wrhs } = parsed;
      const merged = { build, locales, ...wrhs };

      resolve(merged);
    });
  });
};
