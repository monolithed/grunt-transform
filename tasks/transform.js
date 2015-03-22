/*!
 * grunt-transform
 *
 * @author Abashkin Alexander <monolithed@gmail.com>
 * @license MIT, 2015
 */

'use strict';

var path = require('path');

var espree = require('espree'),
	ast = require('ast-traverse');


module.exports = function (grunt) {
	grunt.registerMultiTask('transform', 'Sting alter', function () {
		var options = this.options({
			tree: {
				range: true
			},

			features: {},

			process: function (node, source) {
				return source;
			}
		});

		var source = '';

		this.files.forEach(function (files) {
			files.src.forEach(function (name) {
				var file = null;

				try {
					file = path.resolve(name);
				}
				catch (error) {
					grunt.log.fail('[Path resolving]\n - %s', error);
				}

				if (!grunt.file.isFile(file)) {
					return 0;
				}

				try {
					source += grunt.file.read(file) + '\n';
				}
				catch (error) {
					grunt.log.fail('[File reading]\n - %s', error);
				}
			});

			var parse = null;

			options.tree.ecmaFeatures = options.features;

			try {
				parse = espree.parse(source, options.tree);
			}
			catch (error) {
				grunt.log.fail('[File parsing]\n - %s', error);
			}

			var output = options.process({
				pre: function (traverse) {
					ast(parse, { pre : traverse });
				},
				post: function (traverse) {
					ast(parse, { post : traverse });
				}
			}, source);

			grunt.file.write(files.dest, output);
			grunt.log.oklns('File "' + files.dest + '" created.');
		});
	});
};
