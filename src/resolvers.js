/**
 * This file contains only CUSTOMIZED resolvers, since we are using a remote schema,
 * we already have implemented the queries from the remote server.
 *
 * If you would like to overwrite an existing query, you can add it here.
 */
const { GraphQLClient } = require("graphql-request");
const uploadImage = require("./uploadImage");

const { GRAPHCMS_ENDPOINT, GRAPHCMS_AUTH_TOKEN } = process.env;

const graphQLClient = new GraphQLClient(GRAPHCMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${GRAPHCMS_AUTH_TOKEN}`
  }
});

const STATUS = process.env.NODE_ENV === "development" ? "DRAFT" : "PUBLISHED";

const CREATE_KUDO = `
  mutation createKudo(
    $from: String
    $to: String
    $message: String!
    $status: Status!
    $imgUrl: String!
  ) {
    createKudo(
      data: {
        from: $from,
        to: $to,
        message: $message,
        status: $status,
        imgUrl: $imgUrl
      }
    ) {
      id
      from
      to
      message
      imgUrl
      createdAt
    }
  }
`;

module.exports = {
  Mutation: {
    createKudo: async (_, { data: { from, to, message, imgUrl } }) => {
      try {
        const savedImage = await uploadImage(imgUrl);
        const { url, secure_url } = savedImage;
        const variables = {
          from,
          to,
          message,
          imgUrl: secure_url || url,
          status: STATUS
        };
        const data = await graphQLClient.request(CREATE_KUDO, variables);
        return data.createKudo;

        // // The following code is for testing porpouses only, do not use in production.
        // const waait = millis =>
        // new Promise(resolve => setTimeout(resolve, millis));
        // await waait(3000);
        // return {
        //   _id: "test-id",
        //   id: "test-id",
        //   from,
        //   to,
        //   message,
        //   imgUrl:
        //     "https://res.cloudinary.com/dtceilk6o/image/upload/v1532560503/ll5ojzzb0lav67lfqcyj.png"
        // };
      } catch (err) {
        console.error("Error in createKudo mutation", err);
        throw err;
      }
    }
  }
};
