const { gql } = require("apollo-server");

const typeDefs = gql`
  # Type definitions to use
  type Kudo {
    _id: ID!
    from: String
    to: String
    message: String
    imgUrl: String # base64
    createdAt: String # unix timestamp
  }

  type Feedback {
    id: ID
    message: String!
    rating: Rating!
  }

  enum Rating {
    GOD
    GOOD
    REGULAR
    SHIT
  }

  type Query {
    kudos: [Kudo]
  }

  type Mutation {
    createKudo(
      from: String
      to: String
      message: String!
      imgUrl: String!
    ): Kudo

    createFeedback(message: String!, rating: Rating!): Feedback
  }

`;

module.exports = typeDefs;
