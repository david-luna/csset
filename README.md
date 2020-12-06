# csset

Set operations for CSS selectors

[![GitHub license](https://img.shields.io/npm/l/csset.svg)](https://github.com/david-luna/csset/blob/master/README.md)
[![Issues](https://img.shields.io/github/issues/david-luna/csset.svg)](https://github.com/david-luna/csset/issues)
[![Build Status](https://travis-ci.org/david-luna/csset.svg?branch=master)](https://travis-ci.org/david-luna/csset)
[![Coverage Status](https://coveralls.io/repos/github/david-luna/csset/badge.svg)](https://coveralls.io/github/david-luna/csset)
![Code Size](https://img.shields.io/bundlephobia/minzip/csset.svg)
![Weekly downloads](https://img.shields.io/npm/dw/csset.svg)

## Install

```bash
npm install --save csset
```

## Requirements

Works in all modern browsers :)

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

- Add better support for complex CSS selectors using parsel package
- consider other set operations (diff, complementary, ...)
