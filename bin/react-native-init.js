#!/usr/bin/env node
const sh = require('shelljs');
const fs = require('fs');
const path = require('path');

const tsconfig = fs.readFileSync(path.resolve(__dirname, '../templates/tsconfig.json'), 'utf8');
const eslintrc = fs.readFileSync(path.resolve(__dirname, '../templates/.eslintrc'), 'utf8');
const gitignore = fs.readFileSync(path.resolve(__dirname, '../templates/.gitignore'), 'utf8');
sh.exec('yarn add @types/react @types/react-native eslint eslint-config-react-native-wcandillon --dev');
sh.mv('App.js', 'App.tsx');
sh.config.silent = true;
sh.echo(tsconfig).to('tsconfig.json');
sh.echo(eslintrc).to('.eslintrc');
sh.echo(gitignore).to('.gitignore');
const package = JSON.parse(sh.cat('package.json'));
package.scripts.lint = "eslint App.tsx components/*";
package.scripts.tsc = "tsc";
sh.echo(JSON.stringify(package, null, 2)).to('package.json');
sh.config.silent = false;

console.log("done!");
