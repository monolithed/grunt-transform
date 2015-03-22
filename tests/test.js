/*!
 * grunt-transform tests
 *
 * @author Abashkin Alexander <monolithed@gmail.com>
 * @license MIT, 2015
 */

'use strict';

var fs = require('fs');

exports.tests = {
	build: function (test) {
		var fixtures = fs.readFileSync('./cache/actual.js', 'utf8'),
			expected = fs.readFileSync('./tests/expected.js', 'utf8');

		test.equal(fixtures, expected);
		test.done();
	}
};
