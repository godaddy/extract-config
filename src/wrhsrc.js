const fs = require('fs');
const path = require('path');

/**
 * Return the .wrhsrc at a given path, or an empty object if no file exists
 * @param  {String}   repo     path to repo
 * @param  {Function} callback completion handler
 */
module.exports = function (repo, callback) {
  const file = path.join(repo, '.wrhsrc');
  fs.readFile(file, 'utf8', (err, data) => {
    debugger;
    // there was an issue with reading the file
    if(err && err.code !== 'ENOENT') {
      return callback(err);
    }

    // the file does not exist
    if(err && err.code === 'ENOENT') {
      return callback(null, {})
    }


    // the file does exist
    callback(null, JSON.parse(data));
  });
};
