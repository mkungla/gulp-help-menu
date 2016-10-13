# gulp-help-menu

> Help menu for Gulp, Task descriptions and flags for gulp --task (-T), Help menu banner with info from your package.json.

[![NPM version][npm-v-image]][npm-v-url] [![Downloads][npm-downloads-image]][npm-downloads-url] |
## Install

```sh
$ npm install --save gulp-help-menu
```
## Usage


```js
// Add it to your gulpfile.js
const gulp_help_menu  = require('gulp-help-menu');

// Set description [flags] for your tasks
gulp.task('your-task', ['dep1','dep2','dep3'], function () {
  /// ...
});
gulp.tasks['your-task'].description = 'This is gulp-help-menu example';
gulp.tasks['your-task'].flags = {
  '-d --dummy-flag': 'Thats one dummy flag'
};


gulp.task('another-task', ['dep1','dep2','dep3'], function () {
  /// ...
});
gulp.tasks['another-task'].description = 'This is gulp-help-menu example';
gulp.tasks['another-task'].flags = {
  '-a --another-dummy-flag': 'Thats one dummy flag'
};

// At the end of your gulpfile.js add help task which is set by gulp-help-menu
gulp.task('default', ['help']);
gulp_help_menu.register(gulp);
```


<!-- NPM version -->
[npm-v-image]: https://img.shields.io/npm/v/gulp-help-menu.svg
[npm-v-url]: https://npmjs.org/package/gulp-help-menu

<!-- NPM Downlods-->
[npm-downloads-image]: http://img.shields.io/npm/dt/gulp-help-menu.svg
[npm-downloads-url]: https://npmjs.org/package/gulp-help-menu
