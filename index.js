// there's no window objext in Nodejs
// there's not DOM so no document object
// but there exists a process object


// const { generateRandomNumber, celciusToFarenheit } = require('./utils'); // this is common js syntax

// console.log(`Random number ${generateRandomNumber()}`);
// console.log(`Celcius to Farenheit ${celciusToFarenheit(0)}`);


// import getPosts, { getPostsLength } from "./postController.js";

// console.log(getPosts());
// console.log(`Posts length: ${getPostsLength()}`)

const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

// Routes

// server side rendered HTML document response
app.get('/users', (req, res) => {
  const html = `
    <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
  `;
  return res.send(html);
});

// endpoint to return JSON data that can be used by clients like mobile devs
// REST APIs
app.get('/api/users', (req, res) => {
  return res.json(users);
});

app
  .route('/api/users/:id')
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    // TODO: Edit the user with id
    return res.json({ status: 'pending' });
  })
  .delete((req, res) => {
    // TODO: Delete the user with id
    return res.json({ status: 'pending' });
  });

app.post('/api/users', (req, res) => {
  // TODO: Create new user
  return res.json({ status: 'pending' });
});



app.listen(8000, () => console.log(`Server Started at port ${PORT}`)); 