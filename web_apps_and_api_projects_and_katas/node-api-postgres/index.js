const express = require("express");
const bodyParser = require("body-parser");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("./middleware/users");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/users", getUsers);
app.get("/users/:id", getUser);
app.post("/users", createUser);
app.put("/users/:id", updateUser);
app.delete("/users/:id", deleteUser);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
