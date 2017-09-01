var request = require('request');
var fs = require('fs');
var zlib = require('zlib');

// request('http://www.pluralsight.com/').pipe(fs.createWriteStream('pluralsight.html'));

request('http://www.pluralsight.com/').pipe(zlib.createGzip()).pipe(fs.createWriteStream('pluralsight.html'));