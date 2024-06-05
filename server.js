import http from 'http';
import fs from "fs";
import url from "url";

const PORT = 8080;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  // res.end('<h1>Hello world!</h1>');
  // res.statusCode = 404;

  // res.write('Hello world!');
  // res.writeHead(500, { 'Content-Type': 'application/json' });
  // res.end(JSON.stringify({ message: 'Server Error' }));

  const log = `${Date.now()}: ${req.url} New Req Received\n`;
  const myUrl = url.parse(req.url, true);
  fs.appendFile("./logs.txt", log, (err, data) => {
    switch(myUrl.pathname) {
      case "/":
        res.end("Homepage");
        break;
      case "/about":
        const username = myUrl.query.name;
        // console.log(myUrl.query)
        res.end(`Hello from about page ${username}`);
        break;
      default:
        res.end("Not found");
        break;
    }
  })
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});