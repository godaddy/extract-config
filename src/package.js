const fs = require('fs');
const path = require('path');

/**
 * Return the .wrhsrc at a given path, or an empty object if no file exists
 * @param  {String}   repo     path to repo
 * @param  {Function} callback completion handler
 */
module.exports = function (repo, callback) {
  const file = path.join(repo, 'package.json');
  fs.readFile(file, 'utf8', (err, data) => {
    // there was an issue with reading the file
    if (err) {
      return callback(err);
    }

    const parsed = JSON.parse(data);
    const nested = parsed.wrhs || {};
    const merged = { ...parsed, ...nested };
    delete merged.wrhs;

    // now extract values that are not relevant to warehouse.ai

    callback(null, merged);
  });
};
