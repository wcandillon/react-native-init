#!/usr/bin/env node
const sh = require('shelljs');
const fs = require('fs');
const path = require('path');

const eslintrc = fs.readFileSync(path.resolve(__dirname, '../templates/.eslintrc'), 'utf8');
sh.echo(eslintrc).to('.eslintrc');
sh.exec('yarn add eslint eslint-config-react-native-wcandillon --dev');
const package = JSON.parse(sh.cat('package.json'));
package.scripts.lint = "eslint --ext .js,.ts,.tsx .";
package.scripts.tsc = "tsc";
sh.echo(JSON.stringify(package, null, 2)).to('package.json');

const tsConfig = JSON.parse(sh.cat('tsconfig.json'));
tsConfig.compilerOptions = {
  ...tsConfig.compilerOptions,
  "strict": true,                           /* Enable all strict type-checking options. */
  "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
  "strictNullChecks": true,              /* Enable strict null checks. */
  "strictFunctionTypes": true,           /* Enable strict checking of function types. */
  "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
  "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
  "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

  /* Additional Checks */
  "noUnusedLocals": true,                /* Report errors on unused locals. */
  "noUnusedParameters": true,            /* Report errors on unused parameters. */
  "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
  "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */
  "forceConsistentCasingInFileNames": true,
}
sh.echo(JSON.stringify(tsConfig, null, 2)).to('tsconfig.json');

console.log("done!");
