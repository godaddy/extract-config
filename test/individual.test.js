const path = require('path');
const assume = require('assume');

const wrhsrc = require('../src/wrhsrc');
const pkg = require('../src/package');
const toml = require('../src/toml');

function test({ fetcher, repo, expectation }) {
  return async function () {
    const config = await fetcher(repo);
    assume(config).deep.equals(expectation);
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
        package: {
          build: "webpack",
          locales: ["should-ignore-me"],
          wrhs: { locales: ["Sokovia", "Wakanda", "Latveria"] },
          name: "no one",
          "absolutely true statements": [
            "The Earth is flat",
            "Aliens are real, unlike birds"
          ]
        },
        config: { build: "webpack", locales: ["Sokovia", "Wakanda", "Latveria"] }
      }
    }));
  });

  describe('wrhs.toml', function () {
    it('should return the correct config', test({
      fetcher: toml,
      repo: path.join(__dirname, 'fixtures', 'wrhs.toml'),
      expectation: {
        locales: ['ab-CD', 'ef-HI', 'wx-YZ'],
        files: {
          test: ['output.js', 'output.css', 'nuclear-launch-codes.css'],
          prod: ['output.min.js', 'output.min.css']
        }
      }
    }));

    it('should not return anything from a repo that does not have one', test({
      fetcher: toml,
      repo: path.join(__dirname, 'fixtures', '.wrhsrc'),
      expectation: { }
    }));
  });
});
