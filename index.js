// there's no window objext in Nodejs
// there's not DOM so no document object
// but there exists a process object


// const { generateRandomNumber, celciusToFarenheit } = require('./utils'); // this is common js syntax

// console.log(`Random number ${generateRandomNumber()}`);
// console.log(`Celcius to Farenheit ${celciusToFarenheit(0)}`);


import getPosts, { getPostsLength } from "./postController.js";

console.log(getPosts());
console.log(`Posts length: ${getPostsLength()}`)