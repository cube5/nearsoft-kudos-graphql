const { gql } = require("apollo-server");

const typeDefs = gql`
  # Type definitions to use
  type Kudo {
    _id: ID!
    from: String
    to: String
    message: String
    imgSrc: String # base64
    createdAt: String # unix timestamp
  }

  type Query {
    kudos: [Kudo]
  }

  type Mutation {
    createKudo(
      from: String
      to: String
      message: String!
      imgSrc: String!
    ): Kudo
  }

`;

module.exports = typeDefs;
