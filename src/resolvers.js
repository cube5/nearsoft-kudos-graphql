const datasource = require("./datasource");

module.exports = {
  Query: {
    kudos: async () => {
      try {
        await datasource.find();
      } catch (err) {
        console.error("Error on kudos query", err);
        return [];
      }
    }
  },

  Mutation: {
    createKudo: async (_, { from, to, message, imgSrc }) => {
      try {
        const kudo = {
          from,
          to,
          message,
          imgSrc,
          createdAt: `${new Date().getTime()}`
        };
        return await datasource.save(kudo); // returns saved kudo
      } catch (err) {
        console.error("Error on createKudo mutation", err);
        return null;
      }
    }
  }
};
