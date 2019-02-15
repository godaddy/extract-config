const path = require('path');
const assume = require('assume');

const wrhsrc = require('../src/wrhsrc');
const pkg = require('../src/package');
const toml = require('../src/toml');

function test({ fetcher, repo, expectation }) {
  return function (done) {
    fetcher(repo, (err, config) => {
      assume(err).is.falsey();
      assume(config).deep.equals(expectation);
      done();
    });
  };
}

describe('Reading config from each source', function () {
  describe('.wrhsrc', function () {
    it('should return the correct config', test({
      fetcher: wrhsrc,
      repo: path.join(__dirname, 'fixtures', '.wrhsrc'),
      expectation: { power: 'unlimited' }
    }));

    it('should not return anything from a repo that does not have one', test({
      fetcher: wrhsrc,
      repo: path.join(__dirname, 'fixtures', 'wrhs.toml'),
      expectation: { }
    }));
  });

  describe('package.json', function () {
    it('should return the correct config', test({
      fetcher: pkg,
      repo: path.join(__dirname, 'fixtures', 'package.json'),
      expectation: {
        build: 'webpack',
        locales: [ 'Sokovia', 'Wakanda', 'Latveria' ]
      }
    }));
  });

  describe('wrhs.toml', function () {
    it('should return the correct config', test({
      fetcher: toml,
      repo: path.join(__dirname, 'fixtures', 'wrhs.toml'),
      expectation: { hello: 'there' }
    }));

    it('should not return anything from a repo that does not have one', test({
      fetcher: toml,
      repo: path.join(__dirname, 'fixtures', '.wrhsrc'),
      expectation: { }
    }));
  });
});
