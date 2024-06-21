/* eslint-disable max-lines */
import assert from 'node:assert';
import { test } from 'node:test';

import { createMatcher } from '../lib/css-attr-matcher.js';
import {
  MATCHER_CONTAINS,
  MATCHER_EQUAL,
  MATCHER_OCCURRENCE,
  MATCHER_PREFIX,
  MATCHER_PRESENCE,
  MATCHER_SUBCODE,
  MATCHER_SUFFIX,
} from '../lib/symbols.js';
import { OPERATION_CHARS } from './constants.js';

const containsMatcher = createMatcher(MATCHER_CONTAINS, 'value');
test('ContainsMatcher - supersetOf', () => {
  checkMatchers(containsMatcher, 'supersetOf', [
    // Presence
    ['', false],
    // // Combinations of equal
    ['=value', true],
    ['=Xvalue', true],
    ['=valueX', true],
    ['=XvalueX', true],
    ['=XXXXXXX', false],
    ['=XXaluXX', false],
    // // Combinations of prefix
    ['^=value', true],
    ['^=Xvalue', true],
    ['^=valueX', true],
    ['^=XvalueX', true],
    ['^=XXXXXXX', false],
    ['^=XXaluXX', false],
    // // Combinations of suffix
    ['$=value', true],
    ['$=Xvalue', true],
    ['$=valueX', true],
    ['$=XvalueX', true],
    ['$=XXXXXXX', false],
    ['$=XXaluXX', false],
    // Combinations of contains
    ['*=value', true],
    ['*=Xvalue', true],
    ['*=valueX', true],
    ['*=XvalueX', true],
    ['*=XXXXXXX', false],
    ['*=XXaluXX', false],
    // Combinations of occurence
    ['~=value', true],
    ['~=Xvalue', true],
    ['~=valueX', true],
    ['~=XvalueX', true],
    ['~=XXXXXXX', false],
    ['~=XXaluXX', false],
    // // Combinations of subcode
    ['|=value', true],
    ['|=Xvalue', true],
    ['|=valueX', true],
    ['|=XvalueX', true],
    ['|=XXXXXXX', false],
    ['|=XXaluXX', false],
  ]);
});

test('ContainsMatcher - union', () => {
  checkMatchers(containsMatcher, 'union', [
    // Combinations of contains
    ['*=value', '*="value"'],
    ['*=Xvalue', '*="value"'],
    ['*=valueX', '*="value"'],
    ['*=XvalueX', '*="value"'],
    ['*=XXXXXXX', 'null'],
    ['*=XXaluXX', 'null'],
    // Combinations of equal
    ['=value', '*="value"'],
    ['=Xvalue', '*="value"'],
    ['=valueX', '*="value"'],
    ['=XvalueX', '*="value"'],
    ['=XXXXXXX', 'null'],
    ['=XXaluXX', 'null'],
    // Combinations of occurence
    ['~=value', '*="value"'],
    ['~=Xvalue', '*="value"'],
    ['~=valueX', '*="value"'],
    ['~=XvalueX', '*="value"'],
    ['~=XXXXXXX', 'null'],
    ['~=XXaluXX', 'null'],
    // Combinations of prefix
    ['^=value', '*="value"'],
    ['^=Xvalue', '*="value"'],
    ['^=valueX', '*="value"'],
    ['^=XvalueX', '*="value"'],
    ['^=XXXXXXX', 'null'],
    ['^=XXaluXX', 'null'],
    // Presence
    ['', ''],
    // Combinations of subcode
    ['|=value', '*="value"'],
    ['|=Xvalue', '*="value"'],
    ['|=valueX', '*="value"'],
    ['|=XvalueX', '*="value"'],
    ['|=XXXXXXX', 'null'],
    ['|=XXaluXX', 'null'],
    // Combinations of suffix
    ['$=value', '*="value"'],
    ['$=Xvalue', '*="value"'],
    ['$=valueX', '*="value"'],
    ['$=XvalueX', '*="value"'],
    ['$=XXXXXXX', 'null'],
    ['$=XXaluXX', 'null'],
  ]);
});

test('ContainsMatcher - intersection', () => {
  checkMatchers(containsMatcher, 'intersection', [
    // Combinations of contains
    ['*=value', '*="value"'],
    ['*=Xvalue', '*="Xvalue"'],
    ['*=valueX', '*="valueX"'],
    ['*=XvalueX', '*="XvalueX"'],
    ['*=XXXXXXX', 'null'],
    ['*=XXaluXX', 'null'],
    ['', '*="value"'],
    // Combinations of equal
    ['=value', '="value"'],
    ['=Xvalue', '="Xvalue"'],
    ['=valueX', '="valueX"'],
    ['=XvalueX', '="XvalueX"'],
    ['=XXXXXXX', 'undefined'],
    ['=XXaluXX', 'undefined'],
    // Combinations of occurence
    ['~=value', '~="value"'],
    ['~=Xvalue', '~="Xvalue"'],
    ['~=valueX', '~="valueX"'],
    ['~=XvalueX', '~="XvalueX"'],
    ['~=XXXXXXX', 'null'],
    ['~=XXaluXX', 'null'],
    // Presence
    ['', '*="value"'],
    // Combinations of prefix
    ['^=value', '^="value"'],
    ['^=Xvalue', '^="Xvalue"'],
    ['^=valueX', '^="valueX"'],
    ['^=XvalueX', '^="XvalueX"'],
    ['^=XXXXXXX', 'null'],
    ['^=XXaluXX', 'null'],
    // Combinations of subcode
    ['|=value', '|="value"'],
    ['|=Xvalue', '|="Xvalue"'],
    ['|=valueX', '|="valueX"'],
    ['|=XvalueX', '|="XvalueX"'],
    ['|=XXXXXXX', 'null'],
    ['|=XXaluXX', 'null'],
    // Combinations of suffix
    ['$=value', '$="value"'],
    ['$=Xvalue', '$="Xvalue"'],
    ['$=valueX', '$="valueX"'],
    ['$=XvalueX', '$="XvalueX"'],
    ['$=XXXXXXX', 'null'],
    ['$=XXaluXX', 'null'],
  ]);
});

// EQUAL MATCHER
const equalMatcher = createMatcher(MATCHER_EQUAL, 'value');
test('EqualMatcher - supersetOf', () => {
  checkMatchers(equalMatcher, 'supersetOf', [
    // Combinations of contains
    ['*=value', false],
    ['*=Xvalue', false],
    ['*=valueX', false],
    ['*=XvalueX', false],
    ['*=XXXXXXX', false],
    ['*=XXaluXX', false],
    // Combinations of equal
    ['=value', true],
    ['=Xvalue', false],
    ['=valueX', false],
    ['=XvalueX', false],
    ['=XXXXXXX', false],
    ['=XXaluXX', false],
    // Combinations of occurence
    ['~=value', false],
    ['~=Xvalue', false],
    ['~=valueX', false],
    ['~=XvalueX', false],
    ['~=XXXXXXX', false],
    ['~=XXaluXX', false],
    // Presence
    ['', false],
    // Combinations of prefix
    ['^=value', false],
    ['^=Xvalue', false],
    ['^=valueX', false],
    ['^=XvalueX', false],
    ['^=XXXXXXX', false],
    ['^=XXaluXX', false],
    // Combinations of subcode
    ['|=value', false],
    ['|=Xvalue', false],
    ['|=valueX', false],
    ['|=XvalueX', false],
    ['|=XXXXXXX', false],
    ['|=XXaluXX', false],
    // Combinations of suffix
    ['$=value', false],
    ['$=Xvalue', false],
    ['$=valueX', false],
    ['$=XvalueX', false],
    ['$=XXXXXXX', false],
    ['$=XXaluXX', false],
  ]);
});

test('EqualMatcher - union', () => {
  checkMatchers(equalMatcher, 'union', [
    // Combinations of contains
    ['*=value', '*="value"'],
    ['*=Xvalue', 'null'],
    ['*=valueX', 'null'],
    ['*=XvalueX', 'null'],
    ['*=XXXXXXX', 'null'],
    ['*=XXaluXX', 'null'],
    // Combinations of equal
    ['=value', '="value"'],
    ['=Xvalue', 'null'],
    ['=valueX', 'null'],
    ['=XvalueX', 'null'],
    ['=XXXXXXX', 'null'],
    ['=XXaluXX', 'null'],
    // Combinations of occurence
    ['~=value', '~="value"'],
    ['~=Xvalue', 'null'],
    ['~=valueX', 'null'],
    ['~=XvalueX', 'null'],
    ['~=XXXXXXX', 'null'],
    ['~=XXaluXX', 'null'],
    // Presence
    ['', ''],
    // Combinations of prefix
    ['^=value', '^="value"'],
    ['^=Xvalue', 'null'],
    ['^=valueX', 'null'],
    ['^=XvalueX', 'null'],
    ['^=XXXXXXX', 'null'],
    ['^=XXaluXX', 'null'],
    // Combinations of subcode
    ['|=value', '|="value"'],
    ['|=Xvalue', 'null'],
    ['|=valueX', 'null'],
    ['|=XvalueX', 'null'],
    ['|=XXXXXXX', 'null'],
    ['|=XXaluXX', 'null'],
    // Combinations of suffix
    ['$=value', '$="value"'],
    ['$=Xvalue', 'null'],
    ['$=valueX', 'null'],
    ['$=XvalueX', 'null'],
    ['$=XXXXXXX', 'null'],
    ['$=XXaluXX', 'null'],
  ]);
});

test('EqualMatcher - intersection', () => {
  checkMatchers(equalMatcher, 'intersection', [
    // Combinations of contains
    ['*=value', '="value"'],
    ['*=Xvalue', 'undefined'],
    ['*=valueX', 'undefined'],
    ['*=XvalueX', 'undefined'],
    ['*=XXXXXXX', 'undefined'],
    ['*=XXaluXX', 'undefined'],
    // Combinations of equal
    ['=value', '="value"'],
    ['=Xvalue', 'undefined'],
    ['=valueX', 'undefined'],
    ['=XvalueX', 'undefined'],
    ['=XXXXXXX', 'undefined'],
    ['=XXaluXX', 'undefined'],
    // Combinations of occurence
    ['~=value', '="value"'],
    ['~=Xvalue', 'undefined'],
    ['~=valueX', 'undefined'],
    ['~=XvalueX', 'undefined'],
    ['~=XXXXXXX', 'undefined'],
    ['~=XXaluXX', 'undefined'],
    // Presence
    ['', '="value"'],
    // Combinations of prefix
    ['^=value', '="value"'],
    ['^=Xvalue', 'undefined'],
    ['^=valueX', 'undefined'],
    ['^=XvalueX', 'undefined'],
    ['^=XXXXXXX', 'undefined'],
    ['^=XXaluXX', 'undefined'],
    // Combinations of subcode
    ['|=value', '="value"'],
    ['|=Xvalue', 'undefined'],
    ['|=valueX', 'undefined'],
    ['|=XvalueX', 'undefined'],
    ['|=XXXXXXX', 'undefined'],
    ['|=XXaluXX', 'undefined'],
    // Combinations of suffix
    ['$=value', '="value"'],
    ['$=Xvalue', 'undefined'],
    ['$=valueX', 'undefined'],
    ['$=XvalueX', 'undefined'],
    ['$=XXXXXXX', 'undefined'],
    ['$=XXaluXX', 'undefined'],
  ]);
});

// OCCURRENCE MATCHER
const occurenceMatcher = createMatcher(MATCHER_OCCURRENCE, 'value');
test('OccurenceMatcher - supersetOf', () => {
  checkMatchers(occurenceMatcher, 'supersetOf', [
    // Combinations of contains
    ['*=value', false],
    ['*=Xvalue', false],
    ['*=valueX', false],
    ['*=XvalueX', false],
    ['*=XXXXXXX', false],
    ['*=XXaluXX', false],
    // Combinations of equal
    ['=value', true],
    ['=Xvalue', false],
    ['=valueX', false],
    ['=XvalueX', false],
    ['=XXXXXXX', false],
    ['=XXaluXX', false],
    // Combinations of occurence
    ['~=value', true],
    ['~=Xvalue', false],
    ['~=valueX', false],
    ['~=XvalueX', false],
    ['~=XXXXXXX', false],
    ['~=XXaluXX', false],
    // Presence
    ['', false],
    // Combinations of prefix
    ['^=value', false],
    ['^=Xvalue', false],
    ['^=valueX', false],
    ['^=XvalueX', false],
    ['^=XXXXXXX', false],
    ['^=XXaluXX', false],
    // Combinations of subcode
    ['|=value', false],
    ['|=Xvalue', false],
    ['|=valueX', false],
    ['|=XvalueX', false],
    ['|=XXXXXXX', false],
    ['|=XXaluXX', false], // Combinations of suffix
    ['$=value', false],
    ['$=Xvalue', false],
    ['$=valueX', false],
    ['$=XvalueX', false],
    ['$=XXXXXXX', false],
    ['$=XXaluXX', false],
  ]);
});

test('OccurenceMatcher - union', () => {
  checkMatchers(occurenceMatcher, 'union', [
    // Combinations of contains
    ['*=value', '*="value"'],
    ['*=Xvalue', 'null'],
    ['*=valueX', 'null'],
    ['*=XvalueX', 'null'],
    ['*=XXXXXXX', 'null'],
    ['*=XXaluXX', 'null'],
    // Combinations of equal
    ['=value', '~="value"'],
    ['=Xvalue', 'null'],
    ['=valueX', 'null'],
    ['=XvalueX', 'null'],
    ['=XXXXXXX', 'null'],
    ['=XXaluXX', 'null'],
    // Combinations of occurence
    ['~=value', '~="value"'],
    ['~=Xvalue', 'null'],
    ['~=valueX', 'null'],
    ['~=XvalueX', 'null'],
    ['~=XXXXXXX', 'null'],
    ['~=XXaluXX', 'null'],
    // Presence
    ['', ''],
    // Combinations of prefix
    ['^=value', 'null'],
    ['^=Xvalue', 'null'],
    ['^=valueX', 'null'],
    ['^=XvalueX', 'null'],
    ['^=XXXXXXX', 'null'],
    ['^=XXaluXX', 'null'],
    // Combinations of subcode
    ['|=value', 'null'],
    ['|=Xvalue', 'null'],
    ['|=valueX', 'null'],
    ['|=XvalueX', 'null'],
    ['|=XXXXXXX', 'null'],
    ['|=XXaluXX', 'null'],
    // Combinations of suffix
    ['$=value', 'null'],
    ['$=Xvalue', 'null'],
    ['$=valueX', 'null'],
    ['$=XvalueX', 'null'],
    ['$=XXXXXXX', 'null'],
    ['$=XXaluXX', 'null'],
  ]);
});

test('OccurenceMatcher - intersection', () => {
  checkMatchers(occurenceMatcher, 'intersection', [
    // Combinations of contains
    ['*=value', '~="value"'],
    ['*=Xvalue', 'null'],
    ['*=valueX', 'null'],
    ['*=XvalueX', 'null'],
    ['*=XXXXXXX', 'null'],
    ['*=XXaluXX', 'null'],
    // Combinations of equal
    ['=value', '="value"'],
    ['=Xvalue', 'undefined'],
    ['=valueX', 'undefined'],
    ['=XvalueX', 'undefined'],
    ['=XXXXXXX', 'undefined'],
    ['=XXaluXX', 'undefined'],
    // Combinations of occurence
    ['~=value', '~="value"'],
    ['~=Xvalue', 'null'],
    ['~=valueX', 'null'],
    ['~=XvalueX', 'null'],
    ['~=XXXXXXX', 'null'],
    ['~=XXaluXX', 'null'],
    // Presence
    ['', '~="value"'],
    // Combinations of prefix
    ['^=value', 'null'],
    ['^=Xvalue', 'null'],
    ['^=valueX', 'null'],
    ['^=XvalueX', 'null'],
    ['^=XXXXXXX', 'null'],
    ['^=XXaluXX', 'null'],
    // Combinations of subcode
    ['|=value', 'null'],
    ['|=Xvalue', 'null'],
    ['|=valueX', 'null'],
    ['|=XvalueX', 'null'],
    ['|=XXXXXXX', 'null'],
    ['|=XXaluXX', 'null'], // Combinations of suffix
    ['$=value', 'null'],
    ['$=Xvalue', 'null'],
    ['$=valueX', 'null'],
    ['$=XvalueX', 'null'],
    ['$=XXXXXXX', 'null'],
    ['$=XXaluXX', 'null'],
  ]);
});

// PREFIX MATCHER
const prefixMatcher = createMatcher(MATCHER_PREFIX, 'value');
test('PrefixMatcher - supersetOf', () => {
  checkMatchers(prefixMatcher, 'supersetOf', [
    // Combinations of contains
    ['*=value', false],
    ['*=Xvalue', false],
    ['*=valueX', false],
    ['*=XvalueX', false],
    ['*=XXXXXXX', false],
    ['*=XXaluXX', false],
    // Combinations of equal
    ['=value', true],
    ['=Xvalue', false],
    ['=valueX', true],
    ['=XvalueX', false],
    ['=XXXXXXX', false],
    ['=XXaluXX', false],
    // Combinations of occurence
    ['~=value', false],
    ['~=Xvalue', false],
    ['~=valueX', false],
    ['~=XvalueX', false],
    ['~=XXXXXXX', false],
    ['~=XXaluXX', false],
    // Presence
    ['', false],
    // Combinations of prefix
    ['^=value', true],
    ['^=Xvalue', false],
    ['^=valueX', true],
    ['^=XvalueX', false],
    ['^=XXXXXXX', false],
    ['^=XXaluXX', false],
    // Combinations of subcode
    ['|=value', true],
    ['|=Xvalue', false],
    ['|=valueX', true],
    ['|=XvalueX', false],
    ['|=XXXXXXX', false],
    ['|=XXaluXX', false],
    // Combinations of suffix
    ['$=value', false],
    ['$=Xvalue', false],
    ['$=valueX', false],
    ['$=XvalueX', false],
    ['$=XXXXXXX', false],
    ['$=XXaluXX', false],
  ]);
});

test('PrefixMatcher - union', () => {
  checkMatchers(prefixMatcher, 'union', [
    // Combinations of contains
    ['*=value', '*="value"'],
    ['*=Xvalue', 'null'],
    ['*=valueX', 'null'],
    ['*=XvalueX', 'null'],
    ['*=XXXXXXX', 'null'],
    ['*=XXaluXX', 'null'],
    // Combinations of equal
    ['=value', '^="value"'],
    ['=Xvalue', 'null'],
    ['=valueX', '^="value"'],
    ['=XvalueX', 'null'],
    ['=XXXXXXX', 'null'],
    ['=XXaluXX', 'null'],
    // Combinations of occurence
    ['~=value', 'null'],
    ['~=Xvalue', 'null'],
    ['~=valueX', 'null'],
    ['~=XvalueX', 'null'],
    ['~=XXXXXXX', 'null'],
    ['~=XXaluXX', 'null'],
    // Presence
    ['', ''],
    // Combinations of prefix
    ['^=value', '^="value"'],
    ['^=Xvalue', 'null'],
    ['^=valueX', '^="value"'],
    ['^=XvalueX', 'null'],
    ['^=XXXXXXX', 'null'],
    ['^=XXaluXX', 'null'],
    // Combinations of subcode
    ['|=value', '^="value"'],
    ['|=Xvalue', 'null'],
    ['|=valueX', '^="value"'],
    ['|=XvalueX', 'null'],
    ['|=XXXXXXX', 'null'],
    ['|=XXaluXX', 'null'],
    // Combinations of suffix
    ['$=value', 'null'],
    ['$=Xvalue', 'null'],
    ['$=valueX', 'null'],
    ['$=XvalueX', 'null'],
    ['$=XXXXXXX', 'null'],
    ['$=XXaluXX', 'null'],
  ]);
});

test('PrefixMatcher - intersection', () => {
  checkMatchers(prefixMatcher, 'intersection', [
    // Combinations of contains
    ['*=value', '^="value"'],
    ['*=Xvalue', 'null'],
    ['*=valueX', 'null'],
    ['*=XvalueX', 'null'],
    ['*=XXXXXXX', 'null'],
    ['*=XXaluXX', 'null'],
    // Combinations of equal
    ['=value', '="value"'],
    ['=Xvalue', 'undefined'],
    ['=valueX', '="valueX"'],
    ['=XvalueX', 'undefined'],
    ['=XXXXXXX', 'undefined'],
    ['=XXaluXX', 'undefined'],
    // Combinations of occurence
    ['~=value', 'null'],
    ['~=Xvalue', 'null'],
    ['~=valueX', 'null'],
    ['~=XvalueX', 'null'],
    ['~=XXXXXXX', 'null'],
    ['~=XXaluXX', 'null'],
    // Presence
    ['', '^="value"'],
    // Combinations of prefix
    ['^=value', '^="value"'],
    ['^=Xvalue', 'undefined'],
    ['^=valueX', '^="valueX"'],
    ['^=XvalueX', 'undefined'],
    ['^=XXXXXXX', 'undefined'],
    ['^=XXaluXX', 'undefined'],
    // Combinations of subcode
    ['|=value', '|="value"'],
    ['|=Xvalue', 'null'],
    ['|=valueX', '|="valueX"'],
    ['|=XvalueX', 'null'],
    ['|=XXXXXXX', 'null'],
    ['|=XXaluXX', 'null'],
    // Combinations of suffix
    ['$=value', 'null'],
    ['$=Xvalue', 'null'],
    ['$=valueX', 'null'],
    ['$=XvalueX', 'null'],
    ['$=XXXXXXX', 'null'],
    ['$=XXaluXX', 'null'],
  ]);
});

// PRESENCE MATCHER
const presenceMatcher = createMatcher(MATCHER_PRESENCE, 'value');
test('PresenceMatcher - supersetOf', () => {
  checkMatchers(presenceMatcher, 'supersetOf', [
    // Combinations of contains
    ['*=value', true],
    ['*=Xvalue', true],
    ['*=valueX', true],
    ['*=XvalueX', true],
    ['*=XXXXXXX', true],
    ['*=XXaluXX', true],
    // Combinations of equals
    ['=value', true],
    ['=Xvalue', true],
    ['=valueX', true],
    ['=XvalueX', true],
    ['=XXXXXXX', true],
    ['=XXaluXX', true],
    // Combinations of occurence
    ['~=value', true],
    ['~=Xvalue', true],
    ['~=valueX', true],
    ['~=XvalueX', true],
    ['~=XXXXXXX', true],
    ['~=XXaluXX', true],
    // Presence
    ['', true],
    // Combinations of prefix
    ['^=value', true],
    ['^=Xvalue', true],
    ['^=valueX', true],
    ['=XvalueX', true],
    ['=XXXXXXX', true],
    ['=XXaluXX', true],
    // Combinations of subcode
    ['|=value', true],
    ['|=Xvalue', true],
    ['|=valueX', true],
    ['|=XvalueX', true],
    ['|=XXXXXXX', true],
    ['|=XXaluXX', true],
    // Combinations of suffix
    ['$=value', true],
    ['$=Xvalue', true],
    ['$=valueX', true],
    ['$XvalueX', true],
    ['$XXXXXXX', true],
    ['$XXaluXX', true],
  ]);
});

test('PresenceMatcher - union', () => {
  checkMatchers(presenceMatcher, 'union', [
    // Combinations of contains
    ['*=value', ''],
    ['*=Xvalue', ''],
    ['*=valueX', ''],
    ['*=XvalueX', ''],
    ['*=XXXXXXX', ''],
    ['*=XXaluXX', ''],
    // Combinations of equal
    ['=value', ''],
    ['=Xvalue', ''],
    ['=valueX', ''],
    ['=XvalueX', ''],
    ['=XXXXXXX', ''],
    ['=XXaluXX', ''],
    // Combinations of occurrence
    ['~=value', ''],
    ['~=Xvalue', ''],
    ['~=valueX', ''],
    ['~=XvalueX', ''],
    ['~=XXXXXXX', ''],
    ['~=XXaluXX', ''],
    // Presence
    ['', ''],
    // Combinations of prefix
    ['^=value', ''],
    ['^=Xvalue', ''],
    ['^=valueX', ''],
    ['^=XvalueX', ''],
    ['^=XXXXXXX', ''],
    ['^=XXaluXX', ''],
    // Combinations of subcode
    ['|=value', ''],
    ['|=Xvalue', ''],
    ['|=valueX', ''],
    ['|=XvalueX', ''],
    ['|=XXXXXXX', ''],
    ['|=XXaluXX', ''],
    // Combinations of suffix
    ['$=value', ''],
    ['$=Xvalue', ''],
    ['$=valueX', ''],
    ['$=XvalueX', ''],
    ['$=XXXXXXX', ''],
    ['$=XXaluXX', ''],
  ]);
});

test('PresenceMatcher - intersection', () => {
  checkMatchers(presenceMatcher, 'intersection', [
    // Combinations of equal
    ['=value', '="value"'],
    ['=Xvalue', '="Xvalue"'],
    ['=valueX', '="valueX"'],
    ['=XvalueX', '="XvalueX"'],
    ['=XXXXXXX', '="XXXXXXX"'],
    ['=XXaluXX', '="XXaluXX"'],
    // Combinations of contains
    ['*=value', '*="value"'],
    ['*=Xvalue', '*="Xvalue"'],
    ['*=valueX', '*="valueX"'],
    ['*=XvalueX', '*="XvalueX"'],
    ['*=XXXXXXX', '*="XXXXXXX"'],
    ['*=XXaluXX', '*="XXaluXX"'],
    // Combinations of occurrence
    ['~=value', '~="value"'],
    ['~=Xvalue', '~="Xvalue"'],
    ['~=valueX', '~="valueX"'],
    ['~=XvalueX', '~="XvalueX"'],
    ['~=XXXXXXX', '~="XXXXXXX"'],
    ['~=XXaluXX', '~="XXaluXX"'],
    // Presence
    ['', ''],
    // Combinations of prefix
    ['^=value', '^="value"'],
    ['^=Xvalue', '^="Xvalue"'],
    ['^=valueX', '^="valueX"'],
    ['^=XvalueX', '^="XvalueX"'],
    ['^=XXXXXXX', '^="XXXXXXX"'],
    ['^=XXaluXX', '^="XXaluXX"'],
    // Combinations of subcode
    ['|=value', '|="value"'],
    ['|=Xvalue', '|="Xvalue"'],
    ['|=valueX', '|="valueX"'],
    ['|=XvalueX', '|="XvalueX"'],
    ['|=XXXXXXX', '|="XXXXXXX"'],
    ['|=XXaluXX', '|="XXaluXX"'],
    // Combinations of suffix
    ['$=value', '$="value"'],
    ['$=Xvalue', '$="Xvalue"'],
    ['$=valueX', '$="valueX"'],
    ['$=XvalueX', '$="XvalueX"'],
    ['$=XXXXXXX', '$="XXXXXXX"'],
    ['$=XXaluXX', '$="XXaluXX"'],
  ]);
});

// PRESENCE MATCHER
const subcodeMatcher = createMatcher(MATCHER_SUBCODE, 'value');
test('SubcodeMatcher - supersetOf', () => {
  checkMatchers(subcodeMatcher, 'supersetOf', [
    // Combinations of contains
    ['*=value', false],
    ['*=Xvalue', false],
    ['*=valueX', false],
    ['*=XvalueX', false],
    ['*=XXXXXXX', false],
    ['*=XXaluXX', false],
    // Combinations of equal
    ['=value', true],
    ['=Xvalue', false],
    ['=valueX', false],
    ['=XvalueX', false],
    ['=XXXXXXX', false],
    ['=XXaluXX', false],
    // Combinations of occurence
    ['~=value', false],
    ['~=Xvalue', false],
    ['~=valueX', false],
    ['~=XvalueX', false],
    ['~=XXXXXXX', false],
    ['~=XXaluXX', false],
    // Presence
    ['', false],
    // Combinations of prefix
    ['^=value', false],
    ['^=Xvalue', false],
    ['^=valueX', false],
    ['^=XvalueX', false],
    ['^=XXXXXXX', false],
    ['^=XXaluXX', false],
    // Combinations of subcode
    ['|=value', true],
    ['|=Xvalue', false],
    ['|=valueX', false],
    ['|=XvalueX', false],
    ['|=XXXXXXX', false],
    ['|=XXaluXX', false],
    // Combinations of suffix
    ['$=value', false],
    ['$=Xvalue', false],
    ['$=valueX', false],
    ['$=XvalueX', false],
    ['$=XXXXXXX', false],
    ['$=XXaluXX', false],
  ]);
});

test('SubcodeMatcher - union', () => {
  checkMatchers(subcodeMatcher, 'union', [
    // Combinations of contains
    ['*=value', '*="value"'],
    ['*=Xvalue', 'null'],
    ['*=valueX', 'null'],
    ['*=XvalueX', 'null'],
    ['*=XXXXXXX', 'null'],
    ['*=XXaluXX', 'null'],
    // Combinations of equal
    ['=value', '|="value"'],
    ['=Xvalue', 'null'],
    ['=valueX', 'null'],
    ['=XvalueX', 'null'],
    ['=XXXXXXX', 'null'],
    ['=XXaluXX', 'null'],
    // Combinations of occurence
    ['~=value', 'null'],
    ['~=Xvalue', 'null'],
    ['~=valueX', 'null'],
    ['~=XvalueX', 'null'],
    ['~=XXXXXXX', 'null'],
    ['~=XXaluXX', 'null'],
    // Presence
    ['', ''],
    // Combinations of prefix
    ['^=value', '^="value"'],
    ['^=Xvalue', 'null'],
    ['^=valueX', 'null'],
    ['^=XvalueX', 'null'],
    ['^=XXXXXXX', 'null'],
    ['^=XXaluXX', 'null'],
    // Combinations of subcode
    ['|=value', '|="value"'],
    ['|=Xvalue', 'null'],
    ['|=valueX', 'null'],
    ['|=XvalueX', 'null'],
    ['|=XXXXXXX', 'null'],
    ['|=XXaluXX', 'null'],
    // Combinations of suffix
    ['$=value', 'null'],
    ['$=Xvalue', 'null'],
    ['$=valueX', 'null'],
    ['$=XvalueX', 'null'],
    ['$=XXXXXXX', 'null'],
    ['$=XXaluXX', 'null'],
  ]);
});

test('SubcodeMatcher - intersection', () => {
  checkMatchers(subcodeMatcher, 'intersection', [
    // Combinations of contains
    ['*=value', '|="value"'],
    ['*=Xvalue', 'null'],
    ['*=valueX', 'null'],
    ['*=XvalueX', 'null'],
    ['*=XXXXXXX', 'null'],
    ['*=XXaluXX', 'null'],
    // Combinations of equal
    ['=value', '="value"'],
    ['=Xvalue', 'undefined'],
    ['=valueX', 'undefined'],
    ['=XvalueX', 'undefined'],
    ['=XXXXXXX', 'undefined'],
    ['=XXaluXX', 'undefined'],
    // Combinations of occurence
    ['~=value', 'null'],
    ['~=Xvalue', 'null'],
    ['~=valueX', 'null'],
    ['~=XvalueX', 'null'],
    ['~=XXXXXXX', 'null'],
    ['~=XXaluXX', 'null'],
    // Presence
    ['', '|="value"'],
    // Combinations of prefix
    ['^=value', '|="value"'],
    ['^=Xvalue', 'null'],
    ['^=valueX', 'null'],
    ['^=XvalueX', 'null'],
    ['^=XXXXXXX', 'null'],
    ['^=XXaluXX', 'null'],
    // Combinations of subcode
    ['|=value', '|="value"'],
    ['|=Xvalue', 'null'],
    ['|=valueX', 'null'],
    ['|=XvalueX', 'null'],
    ['|=XXXXXXX', 'null'],
    ['|=XXaluXX', 'null'],
    // Combinations of suffix
    ['$=value', 'null'],
    ['$=Xvalue', 'null'],
    ['$=valueX', 'null'],
    ['$=XvalueX', 'null'],
    ['$=XXXXXXX', 'null'],
    ['$=XXaluXX', 'null'],
  ]);
});

// SUFFIX MATCHER
const suffixMatcher = createMatcher(MATCHER_SUFFIX, 'value');
test('SuffixMatcher - supersetOf', () => {
  checkMatchers(suffixMatcher, 'supersetOf', [
    // Combinations of contains
    ['*=value', false],
    ['*=Xvalue', false],
    ['*=valueX', false],
    ['*=XvalueX', false],
    ['*=XXXXXXX', false],
    ['*=XXaluXX', false],
    // Combinations of equals
    ['=value', true],
    ['=Xvalue', true],
    ['=valueX', false],
    ['=XvalueX', false],
    ['=XXXXXXX', false],
    ['=XXaluXX', false],
    // Combinations of occurence
    ['~=value', false],
    ['~=Xvalue', false],
    ['~=valueX', false],
    ['~=XvalueX', false],
    ['~=XXXXXXX', false],
    ['~=XXaluXX', false],
    // Presence
    ['', false],
    // Combinations of prefix
    ['^=value', false],
    ['^=Xvalue', false],
    ['^=valueX', false],
    ['^=XvalueX', false],
    ['^=XXXXXXX', false],
    ['^=XXaluXX', false],
    // Combinations of subcode
    ['|=value', false],
    ['|=Xvalue', false],
    ['|=valueX', false],
    ['|=XvalueX', false],
    ['|=XXXXXXX', false],
    ['|=XXaluXX', false],
    // Combinations of suffix
    ['$=value', true],
    ['$=Xvalue', true],
    ['$=valueX', false],
    ['$=XvalueX', false],
    ['$=XXXXXXX', false],
    ['$=XXaluXX', false],
  ]);
});

test('SuffixMatcher - union', () => {
  checkMatchers(suffixMatcher, 'union', [
    // Combinations of contains
    ['*=value', '*="value"'],
    ['*=Xvalue', 'null'],
    ['*=valueX', 'null'],
    ['*=XvalueX', 'null'],
    ['*=XXXXXXX', 'null'],
    ['*=XXaluXX', 'null'],
    // Combinations of equal
    ['=value', '$="value"'],
    ['=Xvalue', '$="value"'],
    ['=valueX', 'null'],
    ['=XvalueX', 'null'],
    ['=XXXXXXX', 'null'],
    ['=XXaluXX', 'null'],
    // Combinations of occurrence
    ['~=value', 'null'],
    ['~=Xvalue', 'null'],
    ['~=valueX', 'null'],
    ['~=XvalueX', 'null'],
    ['~=XXXXXXX', 'null'],
    ['~=XXaluXX', 'null'],
    // Presence
    ['', ''],
    // Combinations of prefix
    ['^=value', 'null'],
    ['^=Xvalue', 'null'],
    ['^=valueX', 'null'],
    ['^=XvalueX', 'null'],
    ['^=XXXXXXX', 'null'],
    ['^=XXaluXX', 'null'],
    // Combinations of subcode
    ['|=value', 'null'],
    ['|=Xvalue', 'null'],
    ['|=valueX', 'null'],
    ['|=XvalueX', 'null'],
    ['|=XXXXXXX', 'null'],
    ['|=XXaluXX', 'null'],
    // Combinations of suffix
    ['$=value', '$="value"'],
    ['$=Xvalue', '$="value"'],
    ['$=valueX', 'null'],
    ['$=XvalueX', 'null'],
    ['$=XXXXXXX', 'null'],
    ['$=XXaluXX', 'null'],
  ]);
});

test('SuffixMatcher - intersection', () => {
  checkMatchers(suffixMatcher, 'intersection', [
    // Combinations of contains
    ['*=value', '$="value"'],
    ['*=Xvalue', 'null'],
    ['*=valueX', 'null'],
    ['*=XvalueX', 'null'],
    ['*=XXXXXXX', 'null'],
    ['*=XXaluXX', 'null'],
    // Combinations of equal
    ['=value', '="value"'],
    ['=Xvalue', '="Xvalue"'],
    ['=valueX', 'undefined'],
    ['=XvalueX', 'undefined'],
    ['=XXXXXXX', 'undefined'],
    ['=XXaluXX', 'undefined'],
    // Combinations of occurrence
    ['~=value', 'null'],
    ['~=Xvalue', 'null'],
    ['~=valueX', 'null'],
    ['~=XvalueX', 'null'],
    ['~=XXXXXXX', 'null'],
    ['~=XXaluXX', 'null'],
    // Presence
    ['', '$="value"'],
    // Combinations of prefix
    ['^=value', 'null'],
    ['^=Xvalue', 'null'],
    ['^=valueX', 'null'],
    ['^=XvalueX', 'null'],
    ['^=XXXXXXX', 'null'],
    ['^=XXaluXX', 'null'],
    // Combinations of subcode
    ['|=value', 'null'],
    ['|=Xvalue', 'null'],
    ['|=valueX', 'null'],
    ['|=XvalueX', 'null'],
    ['|=XXXXXXX', 'null'],
    ['|=XXaluXX', 'null'],
    // Combinations of suffix
    ['$=value', '$="value"'],
    ['$=Xvalue', '$="Xvalue"'],
    ['$=valueX', 'undefined'],
    ['$=XvalueX', 'undefined'],
    ['$=XXXXXXX', 'undefined'],
    ['$=XXaluXX', 'undefined'],
  ]);
});

// helper funtion to test
/**
 * @typedef {ReturnType<import('../lib/css-attr-matcher.js').createMatcher>} CssAttrMatcher
 * @typedef {import('../lib/symbols.js').MatcherSymbol} MatcherSymbol
 * @typedef {import('./constants.js').MatcherOperation} MatcherOperation
 */

/**
 * @param {CssAttrMatcher} matcher
 * @param {MatcherOperation} operation
 * @param {Array<[string, boolean | string]>} dataset
 */
function checkMatchers(matcher, operation, dataset) {
  dataset.forEach((data) => {
    const [input, expected] = data;
    const parts = input.split('=');
    // eslint-disable-next-line prettier/prettier
    const symbol = /** @type {MatcherSymbol} */(parts.length > 1 ? parts[0] || '=' : '');
    const value = parts.length > 1 ? parts[1] : '';
    const char = OPERATION_CHARS[operation];
    const testMatcher = createMatcher(symbol, value);

    // console.log('comparing', matcher, testMatcher);
    if (char === OPERATION_CHARS.supersetOf) {
      const result = `${matcher} ${char} ${input} <=> ${matcher[operation](testMatcher)}`;
      const message = `${matcher} ${char} ${input} <=> ${expected}`;
      // console.log(result);
      // console.log(message);
      assert.strictEqual(result, message);
    } else {
      const directOperation = `${matcher[operation](testMatcher)}`;
      const inverseOperation = `${testMatcher[operation](matcher)}`;
      const directResult = `(direct)  ${matcher} ${char} ${input} <=> ${directOperation}`;
      const inverseResult = `(inverse) ${input} ${char} ${matcher} <=> ${inverseOperation}`;
      const directMessage = `(direct)  ${matcher} ${char} ${input} <=> ${expected}`;
      const inverseMessage = `(inverse) ${input} ${char} ${matcher} <=> ${expected}`;
      // console.log(directResult);
      // console.log(inverseResult);
      assert.strictEqual(directResult, directMessage);
      assert.strictEqual(inverseResult, inverseMessage);
    }
  });
}
