const path = require("path");
const dotenvPath = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`);
console.log("using .env: ", `.env.${process.env.NODE_ENV}`);
require("dotenv").config({ path: dotenvPath });
const { ApolloServer } = require("apollo-server");

const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
