const path = require('path');
const { promisify } = require('util');
const fs = require('fs');
const read = promisify(fs.readFile);

/**
 * Return the package.json at a given path, or an empty object if no file exists
 * @param  {String}   repo     path to repo
 * @returns {Promise} completion handler
 */
module.exports = async function (repo) {
  const file = path.join(repo, 'package.json');
  let data = {};

  // we don't try/catch here because we want to throw an error if these lines fail
  data = await read(file, 'utf8');
  data = JSON.parse(data);

  // the only fields we care about are `build`, `locales`, and `wrhs`,
  // so we extract them out to one merged object.
  const config = data.wrhs;
  const base = {};
  ['build', 'locales'].forEach(prop => {
    // we use `in` here instead of a typical check boolean because
    // config like `data.build = false` is perfectly valid
    if (prop in data) {
      base[prop] = data[prop];
    }
  });

  return {
    package: data, // the entire package.json
    config: { ...base, ...config } // the extracted warehouse config
  }
};
