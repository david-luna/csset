# csset

Set operations for CSS selectors

[![GitHub license](https://img.shields.io/npm/l/csset.svg)](https://github.com/david-luna/csset/blob/master/README.md)
[![Issues](https://img.shields.io/github/issues/david-luna/csset.svg)](https://github.com/david-luna/csset/issues)
[![Coverage Status](https://coveralls.io/repos/github/david-luna/csset/badge.svg)](https://coveralls.io/github/david-luna/csset)
![Code Size](https://img.shields.io/bundlephobia/minzip/csset.svg)
![Weekly downloads](https://img.shields.io/npm/dw/csset.svg)

## Install

```bash
npm install --save csset
```

## Requirements

Although this lib has been tested using the node's [test runner](https://nodejs.org/docs/latest/api/test.html#test-runner) it should work in all node and browser environments that support `Set` and `template literals`.

## Usage

### Basic

```javascript
import { Csset } from 'csset';

// Create your sets
const set1 = new Csset('div > p');
const set2 = new Csset('div');
const set3 = new Csset('p');

// Make set operations
// supersetOf
console.assert(set1.supersetOf(set2) === false);
console.assert(set2.supersetOf(set1) === false);
console.assert(set3.supersetOf(set1) === true);

// subsetOf
console.assert(set1.subsetOf(set3) === true);
console.assert(set1.subsetOf(set2) === false);

// union
console.assert(set1.union(set3).toString() === 'p');
console.assert(set1.union(set2).toString() === 'div > p, div');

// intersection
console.assert(set1.intersection(set3).toString() === 'div > p');
console.assert(set1.intersection(set2) === undefined); // void means empty set

```

## Known issues & limitations

- As for now pseudo selectors are not supported

## Roadmap

- Support for pseudo-classes
- consider other set operations (diff, complementary, ...)

## Release notes

### [0.1.0]

- BREAKING CHANGE: the package has been migrated from TypeScript to
  JavaScript + JsDocs for types. In this migration I've decided to make the
  package ESM only so `require` would fail to load the lib. The new flag
  `--experimental-require-module` can be used to load the lib if your app
  is in `commonjs` format. Checkout [the docs](https://nodejs.org/docs/latest/api/modules.html#loading-ecmascript-modules-using-require).
- Embed the parser into the lib
- Add `intersection` API
- Add `empty` properti to set class
- Update demos

### [0.0.10]

- Use `parsel-ts` to tokenize selectors

### [0.0.9]

- Added build for ESM modules
