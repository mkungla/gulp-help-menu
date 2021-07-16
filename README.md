# gulp-help-menu

> Help menu for Gulp, Task descriptions and flags for gulp --task (-T), Help menu banner with info from your package.json.

[![NPM version][npm-v-image]][npm-v-url] [![Downloads][npm-downloads-image]][npm-downloads-url]

## Install

```
$ npm install --save gulp-help-menu
```

## Usage


`package.json`

```
"scripts": {
  "help": "gulp -S help"
},
```

`gulpfile.js`

```js
// Example gulpfile.js
const gulp = require("gulp");

// Add it to your gulpfile.js
const gulp_help_menu = require("gulp-help-menu");

// Set description [flags] for your tasks
const yourTask = async () => {};
yourTask.description = "This is gulp-help-menu example";
yourTask.flags = {
  "-d --dummy-flag": "Thats one dummy flag"
};
gulp.task("your-task", yourTask);

const anotherTask = async () => {};
anotherTask.description = "This is gulp-help-menu example";
anotherTask.flags = {
  "-a --another-dummy-flag": "Thats one dummy flag"
};
gulp.task("another-task", anotherTask);

// At the end of your gulpfile.js
gulp_help_menu.register(gulp);
```

<!-- NPM version -->
[npm-v-image]: https://img.shields.io/npm/v/gulp-help-menu.svg
[npm-v-url]: https://npmjs.org/package/gulp-help-menu

<!-- NPM Downlods-->
[npm-downloads-image]: http://img.shields.io/npm/dt/gulp-help-menu.svg
[npm-downloads-url]: https://npmjs.org/package/gulp-help-menu
