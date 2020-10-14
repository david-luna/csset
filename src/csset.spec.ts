import { Csset } from './csset';

test('constructo should parse the selector', () => {
  const selectors = [
    '*',
    'div#id.class1.class2[attr1=val1][attr2=val2]',
    'div p > a.active',
    'div > p + span > a#id',
    'div > section p ~ span',
    'div > section p ~ span, div > p',
  ];

  selectors.forEach(sel => {
    const set = new Csset(sel);

    expect(set).toBeDefined();
  })


});
