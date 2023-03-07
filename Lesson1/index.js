//Export our custom module
const { getCurrentTime } = require('./custom-module/ourmodule');

//Export npm package
const calcjs = require('calcjs');

console.log(getCurrentTime());

//Global variable
global.dateTime = new Date() + 'Date now';
console.log(global);

//Process params and arguments
console.log(process.env);
console.log(process.argv);
//process.exit();

//Global variables __dirname, __filename
console.log(__dirname + '');
console.log(__filename);

console.log(process.argv);

//Work with cli arguments
const [, , a, b] = process.argv;

console.log(parseInt(a) + parseInt(b));
