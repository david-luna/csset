import { tokenize } from 'parsel-ts';

import { CssRule } from './css-rule';
import { CssAttribute } from './css-attribute';

const parseSelector = (selector: string): CssRule => {
  const tokens = tokenize(selector) || [];
  const rule = new CssRule();

  tokens.forEach((token) => {
    if (typeof token !== 'string') {
      switch (token.type) {
        case 'type':
        case 'universal':
          rule.element = token.content;
          break;
        case 'id':
          rule.id = token.name;
          break;
        case 'class':
          rule.addClass(token.name);
          break;
        case 'attribute':
          rule.addAttribute(new CssAttribute([token.name, token.operator, token.value]));
          break;
      }
    }
  });

  return rule;
};

describe('CssRule', () => {
  describe('serialisation', () => {
    test('should provide a canonical form regardless of the way it was filled with', () => {
      const cssrule1 = parseSelector(
        'elem#id.class2.class1[attr1*="value1"][attr2^="value2pref"][attr2$="value2suff"]',
      );
      const cssrule2 = parseSelector(
        'elem[attr1*="value1"]#id.class2[attr2$="value2suff"].class1[attr2^="value2pref"]',
      );

      const expected = 'elem#id.class1.class2[attr1*="value1"][attr2$="value2suff"][attr2^="value2pref"]';

      expect(`${cssrule1}`).toEqual(expected);
      expect(`${cssrule2}`).toEqual(expected);
    });

    test('should merge prefix & suffix different values if they are contained', () => {
      const expected = 'elem#id.class1.class2[attr1^="prefix_value"][attr2$="suffix_value"]';
      const cssrule = parseSelector(
        'elem#id.class2.class1[attr1^="pref"][attr1^="prefix_value"][attr2$="value"][attr2$="suffix_value"]',
      );

      expect(`${cssrule}`).toEqual(expected);
    });
  });

  describe('equals', () => {
    test('should be equal regardless of the order', () => {
      const cssrule1 = parseSelector(
        'elem#id.class2.class1[attr1*="value1"][attr2^="value2pref"][attr2$="value2suff"]',
      );
      const cssrule2 = parseSelector(
        'elem[attr1*="value1"]#id.class2[attr2$="value2suff"].class1[attr2^="value2pref"]',
      );

      expect(cssrule1.equals(cssrule2)).toBeTruthy();
    });

    const testSelector = 'div#id.class1.class2[attr1*="value1"][attr2$="value2suff"][attr2^="value2pref"]';

    test('should be different if different element', () => {
      const cssrule1 = parseSelector(testSelector);
      const cssrule2 = parseSelector(testSelector.replace('div#', 'p#'));

      expect(cssrule1.equals(cssrule2)).toBeFalsy();
    });

    test('should be different if different id', () => {
      const cssrule1 = parseSelector(testSelector);
      const cssrule2 = parseSelector(testSelector.replace('#id', '#id2'));

      expect(cssrule1.equals(cssrule2)).toBeFalsy();
    });

    test('should be different if missing classes', () => {
      const cssrule1 = parseSelector(testSelector);
      const cssrule2 = parseSelector(testSelector.replace('.class2', ''));

      expect(cssrule1.equals(cssrule2)).toBeFalsy();
    });

    test('should be different if missing attributes', () => {
      const cssrule1 = parseSelector(testSelector);
      const cssrule2 = parseSelector(testSelector.replace('[attr1*="value1"]', ''));

      expect(cssrule1.equals(cssrule2)).toBeFalsy();
    });
  });

  describe('supersetOf', () => {
    test('should contain if equal', () => {
      const cssrule1 = parseSelector('div#id.class1.class2');
      const cssrule2 = parseSelector('div#id.class1.class2');

      expect(cssrule1.supersetOf(cssrule2)).toBeTruthy();
    });

    test('should contain if not has id', () => {
      const cssrule1 = parseSelector('div.class1.class2');
      const cssrule2 = parseSelector('div#id.class1.class2');

      expect(cssrule1.supersetOf(cssrule2)).toBeTruthy();
    });

    test('should NOT contain if ID is different', () => {
      const cssrule1 = parseSelector('div#id2.class1.class2');
      const cssrule2 = parseSelector('div#id.class1.class2');

      expect(cssrule1.supersetOf(cssrule2)).toBeFalsy();
    });

    test('should contain if element is *', () => {
      const cssrule1 = parseSelector('*#id.class1.class2');
      const cssrule2 = parseSelector('div#id.class1.class2');

      expect(cssrule1.supersetOf(cssrule2)).toBeTruthy();
    });

    test('should contain if has less classes', () => {
      const cssrule1 = parseSelector('div#id.class1');
      const cssrule2 = parseSelector('div#id.class1.class2');

      expect(cssrule1.supersetOf(cssrule2)).toBeTruthy();
    });

    test('should NOT contain if has more classes', () => {
      const cssrule1 = parseSelector('div#id.class1.class2.class3');
      const cssrule2 = parseSelector('div#id.class1.class2');

      expect(cssrule1.supersetOf(cssrule2)).toBeFalsy();
    });

    test('should NOT contain if has different classes', () => {
      const cssrule1 = parseSelector('div#id.klass1');
      const cssrule2 = parseSelector('div#id.class1.class2');

      expect(cssrule1.supersetOf(cssrule2)).toBeFalsy();
    });

    test('should contain if check for the same attribute', () => {
      const cssrule1 = parseSelector('div#id.class1[attr]');
      const cssrule2 = parseSelector('div#id.class1[attr]');

      expect(cssrule1.supersetOf(cssrule2)).toBeTruthy();
    });

    test('should contain if check for less attributes', () => {
      const cssrule1 = parseSelector('div#id.class1[attr]');
      const cssrule2 = parseSelector('div#id.class1[attr][attr2]');

      expect(cssrule1.supersetOf(cssrule2)).toBeTruthy();
    });

    test('should NOT contain if check for different attributes', () => {
      const cssrule1 = parseSelector('div#id.class1[attr][attr3]');
      const cssrule2 = parseSelector('div#id.class1[attr][attr2]');

      expect(cssrule1.supersetOf(cssrule2)).toBeFalsy();
    });

    test('should contain if check attribute is more generic (presence against others)', () => {
      const selectors = [
        { sel: '=', res: true },
        { sel: '^=', res: true },
        { sel: '$=', res: true },
        { sel: '*=', res: true },
        { sel: '|=', res: true },
        { sel: '~=', res: true },
      ];
      const cssrule1 = parseSelector('div#id.class1[attr]');

      selectors.forEach((item) => {
        const cssrule2 = parseSelector(`div#id.class1[attr${item.sel}"value"]`);

        const superset = cssrule1.supersetOf(cssrule2);
        const string = `${cssrule1} supersetOf ${cssrule2} => ${superset}`;
        const expected = `${cssrule1} supersetOf ${cssrule2} => ${item.res}`;

        expect(string).toEqual(expected);
      });
    });

    test('attribute prefix should contain only subcode and others with same prefix or longer', () => {
      const selectors = [
        { sel: 'attr', res: false },
        { sel: 'attr=value', res: true },
        { sel: 'attr^=value', res: true },
        { sel: 'attr^=value2', res: true },
        { sel: 'attr$=value', res: false },
        { sel: 'attr*=value', res: false },
        { sel: 'attr|=value', res: true },
        { sel: 'attr~=value', res: false },
      ];
      const cssrule1 = parseSelector('div#id.class1[attr^="value"]');

      selectors.forEach((item) => {
        const cssrule2 = parseSelector(`div#id.class1[${item.sel}]`);
        const contains = cssrule1.supersetOf(cssrule2);
        const string = `${cssrule1} contains ${cssrule2} ${contains}`;
        const expected = `${cssrule1} contains ${cssrule2} ${item.res}`;

        expect(string).toEqual(expected);
      });
    });

    test('attribute suffix matcher should contain only others with same suffix or longer', () => {
      const selector1 = 'div#id.class1[attr$=value]';
      const selectors = [
        { sel: 'div#id.class1[attr]', res: false },
        { sel: 'div#id.class1[attr=value]', res: true },
        { sel: 'div#id.class1[attr^=value]', res: false },
        { sel: 'div#id.class1[attr$=value]', res: true },
        { sel: 'div#id.class1[attr$=2value]', res: true },
        { sel: 'div#id.class1[attr*=value]', res: false },
        { sel: 'div#id.class1[attr|=value]', res: false },
        { sel: 'div#id.class1[attr~=value]', res: false },
      ];

      const cssrule1 = parseSelector(selector1);

      selectors.forEach((item) => {
        const cssrule2 = parseSelector(item.sel);
        const contains = cssrule1.supersetOf(cssrule2);
        const string = `${cssrule1} contains ${cssrule2} ${contains}`;
        const expected = `${cssrule1} contains ${cssrule2} ${item.res}`;

        expect(string).toEqual(expected);
      });
    });

    test('attribute contains matcher should contain all others with same value or longer but not presence', () => {
      const selector1 = 'div#id.class1[attr*=value]';
      const selectors = [
        { sel: 'div#id.class1[attr]', res: false },
        { sel: 'div#id.class1[attr=value]', res: true },
        { sel: 'div#id.class1[attr=valuelong]', res: true },
        { sel: 'div#id.class1[attr^=value]', res: true },
        { sel: 'div#id.class1[attr^=valuelong]', res: true },
        { sel: 'div#id.class1[attr$=value]', res: true },
        { sel: 'div#id.class1[attr$=valuelong]', res: true },
        { sel: 'div#id.class1[attr*=value]', res: true },
        { sel: 'div#id.class1[attr*=valuelong]', res: true },
        { sel: 'div#id.class1[attr|=value]', res: true },
        { sel: 'div#id.class1[attr|=valuelong]', res: true },
        { sel: 'div#id.class1[attr~=value]', res: true },
        { sel: 'div#id.class1[attr~=valuelong]', res: true },
      ];

      const cssrule1 = parseSelector(selector1);

      selectors.forEach((item) => {
        const cssrule2 = parseSelector(item.sel);
        const contains = cssrule1.supersetOf(cssrule2);
        const string = `${cssrule1} contains ${cssrule2} ${contains}`;
        const expected = `${cssrule1} contains ${cssrule2} ${item.res}`;

        expect(string).toEqual(expected);
      });
    });
  });

  describe('union', () => {
    test('should return the same if equal', () => {
      const cssrule1 = parseSelector('div#id.class1.class2');
      const cssrule2 = parseSelector('div#id.class1.class2');

      expect(cssrule1.union(cssrule2)).toEqual([cssrule1]);
    });

    test('should return one rule if it is superset of the other', () => {
      const cssrule1 = parseSelector('div.class1.class2');
      const cssrule2 = parseSelector('div#id.class1.class2');

      expect(cssrule1.union(cssrule2)).toEqual([cssrule1]);
      expect(cssrule2.union(cssrule1)).toEqual([cssrule1]);
    });

    test('should return both rules if no one is superset of the other', () => {
      const cssrule1 = parseSelector('div#id2.class1.class2');
      const cssrule2 = parseSelector('div#id.class1.class2');

      expect(cssrule1.union(cssrule2)).toEqual([cssrule1, cssrule2]);
    });
  });

  describe('intersection', () => {
    test('should return the same if equal', () => {
      const cssrule1 = parseSelector('div#id.class1.class2');
      const cssrule2 = parseSelector('div#id.class1.class2');

      expect(cssrule1.intersection(cssrule2)).toEqual(cssrule1);
    });

    test('should return one rule if it is subset of the other and void otherwise', () => {
      const cssrule1 = parseSelector('div.class1.class2');
      const cssrule2 = parseSelector('div#id.class1.class2');

      expect(cssrule1.intersection(cssrule2)).toEqual(cssrule2);
      expect(cssrule2.intersection(cssrule1)).toEqual(cssrule2);
    });

    test('should return void if they have different id', () => {
      const cssrule1 = parseSelector('div#id2.class1.class2');
      const cssrule2 = parseSelector('div#id.class1.class2');

      expect(cssrule1.intersection(cssrule2)).toEqual(void 0);
    });

    test('should return void if they have different element', () => {
      const cssrule1 = parseSelector('div#id.class1.class2');
      const cssrule2 = parseSelector('nav#id.class1.class2');

      expect(cssrule1.intersection(cssrule2)).toEqual(void 0);
    });

    test('should return a rule intersecting attributes', () => {
      const cssrule1 = parseSelector('div#id.class1.class2[attr^="value"]');
      const cssrule2 = parseSelector('div#id.class1.class2[attr="value"]');

      expect(cssrule1.intersection(cssrule2)).toEqual(cssrule2);
    });

    test('should return a rule intersecting classes', () => {
      const cssrule1 = parseSelector('div#id.class1.class2');
      const cssrule2 = parseSelector('div#id.class1.class2.class3');

      expect(cssrule1.intersection(cssrule2)).toEqual(cssrule2);
    });

    test('should void if an attribute intersection is empty set', () => {
      const cssrule1 = parseSelector('div#id.class1.class2[attr="value"]');
      const cssrule2 = parseSelector('div#id.class1.class2[attr="different"]');

      expect(cssrule1.intersection(cssrule2)).toEqual(void 0);
    });
  });
});
