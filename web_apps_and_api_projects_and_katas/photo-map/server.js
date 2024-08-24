require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const { findOrCreateUser } = require("./controllers/userController");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;
    if (req.headers) {
      try {
        authToken = req.headers.authorization;
        if (authToken) {
          currentUser = await findOrCreateUser(authToken);
        }
      } catch (err) {
        console.error(
          `Unable to authenticate user with token ${authToken}`,
          err
        );
      }
      return { currentUser };
    }
  },
});

mongoose
  .connect("mongodb://0.0.0.0:27017/photomap?retryWrites=true&w=majority", {
    useNewUrlParser: true,
  })
  .then(() => console.log(`DB Connected`))
  .catch((err) => console.error(err));

server.listen().then(({ url }) => console.log(`Listening on ${url}`));
