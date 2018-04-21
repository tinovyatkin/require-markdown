'use strict';

const emoji = require('markdown-it-emoji');
const markdownIt = require('markdown-it');
const { readFileSync } = require('fs');
const { resolve, dirname, isAbsolute } = require('path');

const LINEFEED = '\n';

module.exports = (markdownOptions = { typographer: true }) => {
  const md = markdownIt(markdownOptions).use(emoji);
  return path => {
    // reading file
    const content = readFileSync(
      isAbsolute(path) ? path : resolve(dirname(module.parent.filename), path),
      'utf8',
    );
    if (content.includes(LINEFEED)) return md.render(content);
    return md.renderInline(content);
  };
};
