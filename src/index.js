"use strict";

const process = require("process");
const chalk = require("chalk");

class GulpHelpMenuBuilder {
  /**
   * GulpHelpMenuBuilder
   */
  constructor() {
    // HELP_MENU_ENTRIES will collect stuff we need from tasks to create help menu
    this.help_menu_entries = {};

    if (!String.prototype.lpad) {
      String.prototype.lpad = function(pad, len) {
        while (pad.length < len) {
          pad += pad;
        }
        return pad.substr(0, len - this.length) + this;
      };
    }

    if (!String.prototype.rpad) {
      String.prototype.rpad = function(pad, len) {
        while (pad.length < len) {
          pad += pad;
        }
        return this + pad.substr(0, len - this.length);
      };
    }
  }

  /**
   * getRegisteredGulpTasks
   *
   * @param gulp
   */
  getRegisteredGulpTasks(gulp) {
    const tasks = gulp.registry().tasks();
    for (const name in tasks) {
      const task = tasks[name].unwrap();
      this.help_menu_entries[name] = {};
      this.help_menu_entries[name].dep = tasks[name].dep;
      this.help_menu_entries[name].description = "";
      this.help_menu_entries[name].flags = {};

      // Get description
      if (task.hasOwnProperty("description")) {
        this.help_menu_entries[name].description = task.description;
      }

      // Get flags
      if (task.hasOwnProperty("flags")) {
        this.help_menu_entries[name].flags = task.flags;
      }
    }
  }

  /**
   * getHelpMenuDisplay
   *
   */
  getHelpMenuDisplay() {
    let display = chalk.dim.gray(
      "|==============================================================|\n"
    );
    // print  banner
    display += this.getBanner();
    display += chalk.dim.gray(
      "\n|==============================================================|\n"
    );

    // print all commands
    display += this.getCommandsDisplay();

    display += chalk.dim.gray(
      "\n|==============================================================|\n"
    );
    console.log(display);
  }

  /**
   * Get banner
   *
   * @returns {string}
   */
  getBanner() {
    let banner;
    banner =
      chalk.bold("  " + `${process.env.npm_package_name}`) +
      chalk.dim.italic(` v`) +
      chalk.bold.yellow(`${process.env.npm_package_version}\n`);

    // Author
    if ("npm_package_author_name" in process.env) {
      banner += chalk.dim.green(`  by ${process.env.npm_package_author_name}`);
    }
    banner += "\n";

    // Homepage
    if ("npm_package_homepage" in process.env) {
      banner += chalk.dim.yellow(`  ${process.env.npm_package_homepage}\n`);
    }

    // License
    if ("npm_package_license" in process.env) {
      banner += chalk.dim(`  ${process.env.npm_package_license} license \n`);
    }

    banner += "\n";

    // Description
    if ("npm_package_description" in process.env) {
      banner += chalk.dim(`      ${process.env.npm_package_description}\n`);
    }

    return banner;
  }

  /**
   * Create command display
   *
   * @returns {*}
   */
  getCommandsDisplay() {
    let command_display;
    command_display = chalk.bold("  List of Main Commands\n");
    command_display += chalk.italic("    usage: gulp <task> [options]\n\n");

    Object.keys(this.help_menu_entries).forEach(function(cmd) {
      if (cmd === "default") return;

      command_display += chalk.bold.yellow(`  ${cmd}`.rpad(" ", 35));
      command_display +=
        chalk.white(this.help_menu_entries[cmd].description) + "\n";

      Object.keys(this.help_menu_entries[cmd].flags).forEach(function(opt) {
        command_display += chalk.cyan(`       ${opt}`.rpad(" ", 35));
        command_display +=
          chalk.dim(this.help_menu_entries[cmd].flags[opt]) + "\n";
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

    // Loop trough registered Gulp Tasks
    help_menu.getRegisteredGulpTasks(gulp);

    let names = ["help"];
    if (!gulp.registry().get("default")) {
      names.push("default");
    }
    // Register Help Menu
    gulp.task("help", async () => {
      help_menu.getHelpMenuDisplay();
    });
    gulp.task("default", async () => {
      help_menu.getHelpMenuDisplay();
    });
  }
}

module.exports = new GulpHelp();
