const { ApolloServer } = require("apollo-server");
const getRemoteExecutableSchema = require("./schema");

const { APOLLO_ENGINE_APIKEY } = process.env;

async function start() {
  const schema = await getRemoteExecutableSchema();

  const server = new ApolloServer({
    schema,
    introspection: true,
    engine: {
      apiKey: APOLLO_ENGINE_APIKEY
    }
  });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

start();
