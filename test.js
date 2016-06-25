import fs from 'fs';

process.argv.forEach(function (val, index, array) {
	console.log(index + ': ' + val);
    });


//const obj = JSON.parse(fs.readFileSync('', 'utf8'));

console.log('hello world');

const a = p => p + 2;

console.log(a(5))
