try {function one () {
	return 1;
}} catch (error) { console.log("FD:",{
	"start": {
		"line": 1,
		"column": 0
	},
	"end": {
		"line": 3,
		"column": 1
	}
}) }

try {function two () {
	return 2;
}} catch (error) { console.log("FD:",{
	"start": {
		"line": 5,
		"column": 0
	},
	"end": {
		"line": 7,
		"column": 1
	}
}) }

try {function three () {
	return 3;
}} catch (error) { console.log("FD:",{
	"start": {
		"line": 9,
		"column": 0
	},
	"end": {
		"line": 11,
		"column": 1
	}
}) }

try {function four () {
	return 4;
}} catch (error) { console.log("FD:",{
	"start": {
		"line": 13,
		"column": 0
	},
	"end": {
		"line": 15,
		"column": 1
	}
}) }

