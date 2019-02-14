const wrhsrc = require('../src/wrhsrc');
const pkg = require('../src/package');
const toml = require('../src/package');

function test({ fetcher, repo, expectation }, done) {
  it(`should return ${JSON.stringify(expectation)} from ${repo}`, function () {
    fetcher(repo, (err, config) => {
      assume(err).is.falsey();
      assume(config).equals(expectation);
      done();
    });
  });
}

describe('Reading config from each source', function () {
  describe('.wrhsrc', function () {
    it('should return the correct config');
  });
  describe('package.json', function () {
    it('should return the correct config');
  });
  describe('toml', function () {
    it('should return the correct config');
  });
});
