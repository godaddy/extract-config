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

- Enumeration of possible values
- Enumeration of recognized files
- Order of precedence of recognized files

# Testing

```
npm test
```
