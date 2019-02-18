const path = require('path');
const assume = require('assume');
const proxyquire = require('proxyquire');
const extract = proxyquire('../src', {
  './toml': function (repo, callback) {
    callback(null, {
      heroes: ['Clark', 'Diana', 'Bruce'],
      repo: repo + '.toml'
    });
  },
  './package': function (repo, callback) {
    callback(null, {
      heroes: ['Barry', 'John', 'Hal'],
      villians: ['E. Nigma', 'Vandal', 'Sinestro'],
      repo: repo + '.json'
    });
  },
  './wrhsrc': function (repo, callback) {
    callback(null, {
      villians: ['Adrian', 'Victor', 'webpack'],
      worlds: ['Sokovia', 'Wakanda', 'Latveria'],
      repo
    });
  }
});

describe('extract', function () {
  it('returns appropriately merged contents of a repo with multiple config sources', function () {
    const repo = path.join(__dirname, 'fixtures', 'multiple');
    extract(repo, (err, config) => {
      assume(err).is.falsey();
      assume(config).deep.equals({
        heroes: ['Barry', 'John', 'Hal'],
        villians: ['Adrian', 'Victor', 'webpack'],
        worlds: ['Sokovia', 'Wakanda', 'Latveria'],
        repo
      });
    });
  });
});
