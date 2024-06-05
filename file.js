import fs from "fs";
import os from "os";

// Sync
// the sync one will aways return something
// fs.writeFileSync("./test.txt", "Hello world");

// Async
// but this will not return anything rather would expect a callback function
// fs.writeFile("./test.txt", "Hello world Async", (err) => {});


// Sync
// const result = fs.readFileSync("./contacts.txt", "utf-8");
// console.log(result);

// Async
// fs.readFile("./contacts.txt", "utf-8", (err, result) => {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log(result);
//   }
// })


// appends to a file
// fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString());

// copies content from one file to another
// fs.cpSync("./test.txt", "./copy.txt");

// deletes a file
// fs.unlinkSync("./copy.txt");

// returns stats of the file
// console.log(fs.statSync("./test.txt"));

// to create folder
// fs.mkdirSync("my-docs");

// recursively creates directiories under directories
// fs.mkdirSync("my-docs/a/b", { recursive: true });




// BLOCKING AND NON-BLOCKING REQUESTS TO UNDERSTAND NODEJS ARCHITECTURE
// console.log("1");

// Blocking
// const result = fs.readFileSync("contacts.txt", "utf-8");
// console.log(result);
// output as follow:
// 1
// Piyush Garg: +9111111111
// 2
// 3
// 4

// Non-blocking
// fs.readFile("contacts.txt", "utf-8", (err, result) => {
//   console.log(result);
// })
// output as follows:
// 1
// 2
// 3
// 4
// Piyush Garg: +9111111111

// console.log("2");
// console.log("3");
// console.log("4");



// the os module gets us all the data associated with our operating system
// like here we get the total number of cpus available on our machine
console.log(os.cpus().length)