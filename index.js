"use strict";

const abbr = require("markdown-it-abbr");
const comments = require("markdown-it-inline-comments");
const { full: emoji } = require("markdown-it-emoji");
const markdownIt = require("markdown-it");
const sub = require("markdown-it-sub");
const sup = require("markdown-it-sup");
const { readFileSync } = require("fs");
const { resolve, dirname, isAbsolute } = require("path");

const LINEFEED = "\n";

module.exports = (markdownOptions = { typographer: true }) => {
  const md = markdownIt(markdownOptions).use(comments).use(emoji).use(sub).use(sup).use(abbr);
  return (path) => {
    // reading file
    const content = readFileSync(
      isAbsolute(path) ? path : resolve(dirname(module.parent.filename), path),
      "utf8",
    );
    if (content.includes(LINEFEED)) return md.render(content);
    return md.renderInline(content);
  };
};
