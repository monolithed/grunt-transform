# grunt-transform

[![npm version badge](https://img.shields.io/npm/v/grunt-transform.svg)](https://www.npmjs.org/package/grunt-transform)
[![Build Status](https://travis-ci.org/monolithed/grunt-transform.png)](https://travis-ci.org/monolithed/grunt-transform)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE.txt)


> The grunt task to walk the syntax tree, and apply the transformation whenever necessary  


*Based on [Espree](https://www.npmjs.com/package/espree) (an actively-maintained fork of [Esprima](http://esprima.org)) API and used the same AST*


## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-transform --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-transform');
```

## grunt-transform task
_Run this task with the `grunt transform` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### tree
Type: `Object` <br />
Default: `{range: true}`

A complete list of available options:

|   Option  |                When set to true                  |
|:----------|:------------------------------------------------ |
|  range    | Nodes have an index-based location range (array) |
|  loc      | Nodes have line and column-based location info |
|  raw      | Literals have extra property which stores the verbatim source |
|  tokens   | An extra array containing all found tokens |
|  comment  | An extra array containing all line and block comments |
|  tolerant | An extra array containing all errors found, attempts to continue parsing when an error is encountered |

For more details see the [Esprima](http://esprima.org/doc/index.html) documentation

#### features
Type: `Object` <br />
Default: `{blockBindings: true}`

A complete list of available ECMAScript 6 features:

|               Feature             |                When set to true                  |
|:----------------------------------|:------------------------------------------------ |
|  arrowFunctions                   | Enable parsing of arrow functions |
|  blockBindings                    | Enable parsing of let/const |
|  destructuring                    | Enable parsing of destructured arrays and objects |
|  regexYFlag                       | Enable parsing of regular expression y flag |
|  regexUFlag                       | Enable parsing of regular expression u flag |
|  templateStrings                  | Enable parsing of template strings |
|  binaryLiterals                   | Enable parsing of binary literals |
|  octalLiterals                    | Enable parsing of ES6 octal literals |
|  unicodeCodePointEscapes          | Enable parsing unicode code point escape sequences |
|  defaultParams                    | Enable parsing of default parameters |
|  restParams                       | Enable parsing of rest parameters |
|  forOf                            | Enable parsing of for-of statement |
|  objectLiteralComputedProperties  | Enable parsing computed object literal properties |
|  objectLiteralShorthandMethods    | Enable parsing of shorthand object literal methods |
|  objectLiteralShorthandProperties | Enable parsing of shorthand object literal properties |
|  objectLiteralDuplicateProperties | Allow duplicate object literal properties (except '__proto__') |
|  generators                       | Enable parsing of generators/yield |
|  spread                           | Enable parsing spread operator |
|  classes                          | Enable parsing classes |
|  modules                          | Enable parsing of modules |
|  jsx                              | Enable React JSX parsing |
|  globalReturn                     | Enable return in global scope |


For more details see the [Espree](http://npmjs.org/package/espree) documentation


#### process
Type: `Function (traverse, source)`<br />
Default: `(traverse, source) => source;`

This option as an advanced way to control the file contents that are created.

A complete list of available arguments:

|    Argument |            When set to true              |
|:------------|:-----------------------------------------|
|  traverse   | An object with `pre` and `post` visitors |
|  source     | Source code                              |


##### Depth-first traversal types

Pre-order type:

1. Display the data part of root element (or current element)
2. Traverse the left subtree by recursively calling the pre-order function.
3. Traverse the right subtree by recursively calling the pre-order function.

Post-order type:

1. Traverse the left subtree by recursively calling the post-order function.
2. Traverse the right subtree by recursively calling the post-order function.
3. Display the data part of root element (or current element).

The trace of a traversal is called a sequentialisation of the tree. The traversal trace is a list of each visited root node. No one sequentialisation according to pre-, in- or post-order describes the underlying tree uniquely. Given a tree with distinct elements, either pre-order or post-order paired with in-order is sufficient to describe the tree uniquely.

For more details see the [ast-traverse](https://github.com/olov/ast-traverse) documentation


### Usage Example

```js
var Alter = require('string-alter');

module.exports = function (grunt) {
	grunt.config.init({
		transform: {
			test: {
				options: {
					tree: {
						loc: true
					},

					process: function (traverse, source) {
						var alter = new Alter(source);

						traverse.pre(function (node) {
							if (node.type === 'FunctionDeclaration') {
								var where = JSON.stringify(node.loc, null, '\t');

								alter.wrap(
									node.range[0],
									node.range[1],
									'try {',
									'} catch (error) { console.log("FD:",' + where + ') }'
								);
							}
						});

						return alter.apply();
					}
				},

				files: {
					'cache/actual.js': [ 'tests/fixtures/**/*.js' ]
				}
			}
		},
	});

	grunt.loadNpmTasks('grunt-transform');
	grunt.registerTask('default', ['transform']);
};
```


*Input*

```js
function foo () {
	return 1;
}
```


*Output*

```js
try {
	function foo () {
		return 1;
	}
}
catch (error) {
	console.log("FD:",{
		"start": {
			"line": 13,
			"column": 0
		},
		"end": {
			"line": 15,
			"column": 1
		}
	);
}
```


#### A list of popular ast transformers

[falafel](https://www.npmjs.com/package/falafel) <br />
[burrito](https://www.npmjs.com/package/burrito) <br />
[string-alter](https://www.npmjs.com/package/string-alter) <br />


### Tests

```
grunt test
```

### License

MIT


### Links
[Esprima online parser](http://esprima.org/demo/parse.html) <br />
[Esprima documentation](http://esprima.org/doc/index.html) <br />
[Espree](https://www.npmjs.com/package/espree) <br />
[Depth-first search](http://en.wikipedia.org/wiki/Depth-first_search) <br />
[Tree traversal](http://en.wikipedia.org/wiki/Tree_traversal) <br />


Task submitted by [Alexander Abashkin](https://github.com/monolithed)
