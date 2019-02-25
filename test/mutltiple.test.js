const path = require('path');
const assume = require('assume');
const extract = require('../src');

describe('extract', function () {
  it('returns appropriately merged contents of a repo with multiple config sources', async function () {
    const repo = path.join(__dirname, 'fixtures', 'multiple');
    const config = await extract(repo);
    assume(config).deep.equals({
      hello: 'there',
      power: 'unlimited',
      build: 'webpack',
      locales: ['Sokovia', 'Wakanda', 'Latveria']
    });
  });
});
