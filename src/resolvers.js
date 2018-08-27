const datasource = require("./datasource");
const uploadImage = require("./uploadImage");

module.exports = {
  Query: {
    kudos: async () => {
      try {
        const results = await datasource.find();
        return results;
      } catch (err) {
        console.error("Error on kudos query", err);
        return [];
      }
    }
  },

  Mutation: {
    createKudo: async (_, { from, to, message, imgUrl }) => {
      const waait = millis =>
        new Promise(resolve => setTimeout(resolve, millis));
      try {
        const savedImage = await uploadImage(imgUrl);
        const { url, secure_url } = savedImage;
        const kudo = {
          from,
          to,
          message,
          imgUrl: secure_url || url,
          createdAt: new Date()
        };
        const savedKudo = await datasource.save(kudo);
        return savedKudo;

        // The following code is for testing porpouses only, do not use in production.
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
        return null;
      }
    },

    createFeedback: async (_, { message, rating }) => {
      try {
        return await datasource.saveFeedback({ message, rating });
      } catch (err) {
        console.error("Error in createFeedback mutation", err);
        return null;
      }
    }
  }
};
