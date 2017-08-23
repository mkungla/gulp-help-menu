'use strict';

const chalk = require('chalk');
const pkg = require('../../../package.json');

class GulpHelpMenuBuilder {

  /**
   * GulpHelpMenuBuilder
   */
  constructor() {
    // HELP_MENU_ENTRIES will collect stuff we need from tasks to create help menu
    this.help_menu_entries = {}

    if (!String.prototype.lpad) {
      String.prototype.lpad = function(pad, len) {
        while (pad.length < len) {
          pad += pad;
        }
        return pad.substr(0, len-this.length) + this;
      }
    }

    if (!String.prototype.rpad) {
      String.prototype.rpad = function(pad, len) {
        while (pad.length < len) {
          pad += pad;
        }
        return this + pad.substr(0, len-this.length);
      }
    }
  }

  /**
   * Add Symbol.iterator to Gulp tasks
   *
   * @param gulp
   */
  addIterator(gulp) {
    gulp.tasks[Symbol.iterator] = function*() {
      let properties = Object.keys(this);
      for (let i of properties) {
        yield [i, this[i]];
      }
    }
  }

  /**
   * getRegisteredGulpTasks
   *
   * @param gulp
   */
  getRegisteredGulpTasks(gulp) {
    for (let [name, task] of gulp.tasks) {
      this.help_menu_entries[name] = {};
      this.help_menu_entries[name].dep = task.dep;

      // Get description
      this.help_menu_entries[name].description = '';
      if (task.hasOwnProperty('description')) {
        gulp.tasks[name].fn.description = task.description;
        this.help_menu_entries[name].description = task.description;
      }

      // Get flags
      this.help_menu_entries[name].flags = {};
      if (task.hasOwnProperty('flags')) {
        gulp.tasks[name].fn.flags = task.flags;
        this.help_menu_entries[name].flags = task.flags;
      }
    }
  }

  /**
   * getHelpMenuDisplay
   *
   */
  getHelpMenuDisplay() {
    let display = chalk.dim.gray('|==============================================================|\n');
    // print  banner
    display += this.getBanner();
    display += chalk.dim.gray('\n|==============================================================|\n');

    // print all commands
    display += this.getCommandsDisplay();

    display += chalk.dim.gray('\n|==============================================================|\n');
    console.log(display);
  }

  /**
   * Get banner
   *
   * @returns {string}
   */
  getBanner() {
    let banner;
    banner = chalk.bold('  ' + `${pkg.name}`) + chalk.dim.italic(` v:`) + chalk.bold.yellow(`${pkg.version}\n`);
    // Author
    if ('author' in pkg){
      banner += chalk.dim.green(`  by ${pkg.author}`);
    }
    banner += '\n';

    // Homepage
    if ('homepage' in pkg){
      banner += chalk.dim.yellow(`  ${pkg.homepage}\n`);
    }

    // License
    if ('license' in pkg){
      banner += chalk.dim(`  ${pkg.license} license \n`);
    }

    banner += '\n';

    // Description
    if ('description' in pkg){
      banner += chalk.dim(`      ${pkg.description}\n`);
    }

    return banner;
  }

  /**
   * Create command display
   *
   * @returns {*}
   */
  getCommandsDisplay(){
    let command_display;
    command_display = chalk.bold('  List of Main Commands\n');
    command_display += chalk.italic('    usage: gulp <task> [options]\n\n');

    Object.keys(this.help_menu_entries).forEach(function (cmd) {

      if(cmd === 'default') return;
      
      command_display += chalk.bold.blue(`  ${cmd}`.rpad(' ',35));
      command_display += chalk.white(this.help_menu_entries[cmd].description) + '\n';

      Object.keys(this.help_menu_entries[cmd].flags).forEach(function (opt) {

        command_display += chalk.blue(`       ${opt}`.rpad(' ',35));
        command_display += chalk.dim(this.help_menu_entries[cmd].flags[opt]) + '\n';

      }, this);


    }, this);

    return command_display;
  }
}

class GulpHelp {
  constructor(data) {
    // config
  }

  register(gulp) {

    // Only stuff we need to add
    let help_menu = new GulpHelpMenuBuilder(gulp);

    // Add iterator Gulp Tasks
    help_menu.addIterator(gulp);

    // Loop trough registered Gulp Tasks
    help_menu.getRegisteredGulpTasks(gulp);

    // Register Help Menu
    gulp.task('help', () => {help_menu.getHelpMenuDisplay()});

  }
}

module.exports = new GulpHelp();
