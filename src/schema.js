const fetch = require("node-fetch");
const {
  mergeSchemas,
  introspectSchema,
  makeRemoteExecutableSchema
} = require("apollo-server");
const { setContext } = require("apollo-link-context");
const { HttpLink } = require("apollo-link-http");
const resolvers = require("./resolvers");

const { GRAPHCMS_ENDPOINT, GRAPHCMS_AUTH_TOKEN } = process.env;

const http = new HttpLink({ uri: GRAPHCMS_ENDPOINT, fetch });

const link = setContext(() => ({
  headers: {
    Authorization: `Bearer ${GRAPHCMS_AUTH_TOKEN}`
  }
})).concat(http);

async function getRemoteExecutableSchema() {
  // We get the schema from the remote graphql endpoint
  const schema = await introspectSchema(link);
  const executableSchema = makeRemoteExecutableSchema({
    schema,
    link
  });

  // Then we merge our resolvers with the remote schema to be able to overwrite them
  const mergedSchema = mergeSchemas({
    schemas: [executableSchema],
    resolvers
  });

  return mergedSchema;
}

module.exports = getRemoteExecutableSchema;
