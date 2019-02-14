# `@wrhs/extract-config`

[![Version npm](https://img.shields.io/npm/v/@wrhs/extract-config.svg?style=flat-square)](https://www.npmjs.com/package/@wrhs/extract-config)
[![npm Downloads](https://img.shields.io/npm/dm/@wrhs/extract-config.svg?style=flat-square)](https://npmcharts.com/compare/@wrhs/extract-config?minimal=true)
[![Build Status](https://travis-ci.com/warehouseai/extract-config.svg?branch=master)](https://travis-ci.com/warehouseai/extract-config)
[![Dependencies](https://img.shields.io/david/@wrhs/extract-config.svg?style=flat-square)](https://david-dm.org/@wrhs/extract-config)

Extracts warehouse.ai configuration from a given unpacked directory

## Installation

```
npm install --save @wrhs/extract-config
```

# Usage

```js
const extract = require('@wrhs/extract-config');
const path = require('path');
const unpackedRepo = path.join('path', 'to', 'repo');

extract(unpackedRepo, (err, config) => {
  if(err) {
    console.error(err);
  }

  console.log(config);
});
```

Or if `async/await` is more your fancy:

```js
const { promisify } = require('util');
const extract = require('@wrhs/extract-config');
const extractAsync = promisify(extract)

const path = require('path');
const unpackedRepo = path.join('path', 'to', 'repo');

(async function() {
  const config = await extractAsync(unpackedRepo);

  console.log(config);
})();

```

## `config` specification

At most, the `config` will provide the following information

```js
{
  /**
   * Whether or not to perform a webpack build for this package, or if
   * we can just use the source of this directory as-is.
   *
   * Optional
   */
  build: 'webpack',

  /**
   * Different locales in which to build the package, this is helpful for
   * parallelizing builds for any number of locales.
   *
   * Optional
   */
  locales: [
    'English',
    'Sindarin',
    'Klingon',
    'Dothraki'
  ],

  /**
   * What recommended files to use in each environment
   */
  files: {
    dev: [
      'dist/output.css',
      'dist/output.js'
    ],
    test: [
      'dist/output.min.css',
      'dist/output.min.js'
    ],
    prod: [
      'dist/output.min.css',
      'dist/output.min.js'
    ]
  },

  /**
   * Minification options to apply to the output code
   */
  compress: {
    minify: {
      unsafe: true,
      dead_code: true,
      collapse_vars: true,
      drop_console: true,
      conditionals: true,
      booleans: true,
      unused: true,
      if_return: true,
      join_vars: true
    }
  }

  /**
   * TODO: fill this in
   */
  i18n: {
    // ¯\_(ツ)_/¯
  }
}
```

- Enumeration of recognized files
- Order of precedence of recognized files

# Testing

```
npm test
```
