#!/usr/bin/env node
const sh = require('shelljs');
const fs = require('fs');
const path = require('path');

const tsconfig = fs.readFileSync(path.resolve(__dirname, '../templates/tsconfig.json'), 'utf8');
const eslintrc = fs.readFileSync(path.resolve(__dirname, '../templates/.eslintrc'), 'utf8');

const name = process.argv.slice(-1)[0];

if (!name || name.trim() === "") {
  console.log("Please provide project name.");
}

if (!sh.which('expo')) {
  sh.echo('Sorry, this script requires expo');
  sh.exit(1);
}

sh.exec(`expo init ${name} --template blank`);
sh.cd(name);
sh.exec('yarn add @types/expo eslint eslint-config-react-native-wcandillon --dev');
sh.mv('App.js', 'App.tsx');
sh.config.silent = true;
sh.echo(tsconfig).to('tsconfig.json');
sh.echo(eslintrc).to('.eslintrc');
const package = JSON.parse(sh.cat('package.json'));
package.scripts.lint = "eslint App.tsx components/*";
package.scripts.tsc = "tsc";
sh.echo(JSON.stringify(package, null, 2)).to('package.json');
sh.config.silent = false;
sh.rm("package-lock.json");

console.log("done!");
