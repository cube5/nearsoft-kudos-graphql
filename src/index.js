const { ApolloServer } = require("apollo-server");
const getRemoteExecutableSchema = require("./schema");

async function start() {
  const schema = await getRemoteExecutableSchema();

  const server = new ApolloServer({ schema, introspection: true });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

start();
