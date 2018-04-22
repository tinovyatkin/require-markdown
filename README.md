# require-markdown

Loads Markdown files as compiled HTML string synchronously (as Node `require`)

## Motivation

This module suppose to be used in build systems, etc, where you prefer to store texts as Markdown files. Uses [markdown-it](https://github.com/markdown-it/markdown-it) for rendering with emoji, subscript, superscript, comments stripping and abbr plugins enabled.

## Usage

```js
const requireMarkdown = require("require-markdown")(
  (markdownItOptions = { typographer: true })
);

const htmlString = requireMarkdown("../README.md"); // => '<h1>require-markdown</h1>' ....
```
