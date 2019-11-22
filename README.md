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

- TBD

## Usage

### Basic

```javascript
// Typescript
import { Csset } from 'csset';

// Create your sets
const set1 = new Csset('div > p');
const set2 = new Csset('div');
const set3 = new Csset('p');

// Make set operations
console.assert(set1.subset(set2));
console.assert(set1.subset(set3));
console.assert(set2.superset(set1));
console.assert(set3.superset(set1));
// More to come (union, intersection, diff?)

```

## Known issues & limitations

- TBD
