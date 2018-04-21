'use strict';

const requireMarkdown = require('../');

describe('require-markdown', () => {
  test('load README', () => {
    const rm = requireMarkdown();
    const res = rm('../README.md');
    expect(res).toMatchSnapshot();
  });
});
