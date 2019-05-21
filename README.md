# `@wrhs/extract-config`

[![Version npm](https://img.shields.io/npm/v/@wrhs/extract-config.svg?style=flat-square)](https://www.npmjs.com/package/@wrhs/extract-config)
[![License](https://img.shields.io/npm/l/wrhs.svg?style=flat-square)](https://github.com/warehouseai/extract-config/blob/master/package.json)
[![npm Downloads](https://img.shields.io/npm/dm/@wrhs/extract-config.svg?style=flat-square)](https://npmcharts.com/compare/@wrhs/extract-config?minimal=true)
[![Build Status](https://travis-ci.com/warehouseai/extract-config.svg?branch=master)](https://travis-ci.com/warehouseai/extract-config)
[![Dependencies](https://img.shields.io/david/@wrhs/extract-config.svg?style=flat-square)](https://david-dm.org/@wrhs/extract-config)

Extracts warehouse.ai configuration from a given unpacked directory

## Install

```
npm install --save @wrhs/extract-config
```

# Usage

```js
const extract = require('@wrhs/extract-config');
const path = require('path');
const unpackedRepo = path.join('path', 'to', 'repo');

const config = await extract(unpackedRepo);
```

# What is in `config`?

At most, the `config` will provide the following information:

```js
{
  pkg: {
    // the entire contents of the repo's package.json
  },
  wrhs: {
    // Whether or not to perform a webpack build for this package, or if
    // we can just use the source of this directory as-is.
    //
    // Optional (default: none)
    build: 'webpack',

    // Different locales in which to build the package, this is helpful for
    // parallelizing builds for any number of locales.
    //
    // Optional (default: [])
    locales: [
      'en-US',
      'es-CO',
      'de-DE',
      'zh-CN'
    ],

    // What recommended files to use in each environment
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

    // Minification options to apply to the output code
    minify: {
      compress: {
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
  }
}
```

## Allowed files

`@wrhs/extract-config` will recognize the following configuration files and
formats.

### `.wrhsrc`

This is a simple `json` file that contains information in the above format

```json
{
  "build": "webpack",
  "locales": [
    "C",
    "C++",
    "ArnoldC"
  ]
}
```

### `package.json`

Similar to `.wrhsrc` you can place these values into either the base level of
your `package.json`, or into a `wrhs` object (we will merge the base level into
the `wrhs` object if any)

```json
{
  "name": "my-cool-package",
  "version": "1.2.3",
  "wrhs": {
    "build": "webpack",
    "locales": [
      "en-US",
      "es-CO",
      "de-DE"
    ],
    "files": {
      "test": ["dist/output.js", "dist/output.css"],
      "prod": ["dist/output.min.js", "dist/output.min.css"]
    }
  }
}
```

### `wrhs.toml`

```toml
[files]
dev = ['output.js', 'output.css']
test = ['output.min.js', 'output.min.css']
prod = ['output.min.js', 'output.min.css']

build = 'webpack'

locales = [
  'English',
  'Sindarin',
  'Klingon',
  'Dothraki'
]

[minify]
[minify.compress]
unsafe = true
dead_code = true
unsafe = true
dead_code = true
collapse_vars = true
drop_console = true
conditionals = true
booleans = true
unused = true
if_return = true
join_vars = true
```

### Order of configuration precedence

They are listed in order above, but we will resolve potentially conflicting
information based on this precedence:

1. `.wrhsrc`
2. `package.json`
3. `wrhs.toml`

Any configuration from earlier in the list will override identically named
configuration later in the list. For example, I have these 2 files present:

`.wrhsrc`
```json
{
  "build" :"webpack",
  "locales": [
    "Earth", "Mars"
  ]
}
```

`wrhs.toml`
```toml
locales=['Krypton', 'Oa']

[files]
test = ['output.css']
prod = ['output.min.css']
```

The final configuration object will be:

```js
{
  build: 'webpack',
  locales: [
    'Earth', 'Mars'
  ],
  files: {
    test: ['output.css']
    prod: ['output.min.css']
  }
}
```

It's important to note that nested lists and objects will *not* be merged, just
overridden.

We **highly** recommended keeping all of your configuration in one single location,
but to support legacy formats, we allow multiple points of entry.

# Testing

```
npm test
```
