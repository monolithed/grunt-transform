'use strict';

var Alter = require('string-alter');

module.exports = function (grunt) {
	grunt.initConfig({
		transform: {
			test: {
				options: {
					tree: {
						loc  : true,
						range: true
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

		nodeunit: {
			tasks: ['tests/test.js']
		}
	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	grunt.registerTask('test', ['transform:test', 'nodeunit']);
	grunt.registerTask('default', ['test']);
};
