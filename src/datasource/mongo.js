const mongoose = require("mongoose");

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_DATABASE,
  MONGO_DOMAIN,
  MONGO_PORT
} = process.env;

const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_DOMAIN}:${MONGO_PORT}/${MONGO_DATABASE}`;

connect();

const kudoSchema = {
  from: String,
  to: String,
  message: String,
  createdAt: String, // unix timestamp
  imgSrc: String // base64
};

const Kudo = mongoose.model("kudos", kudoSchema, "kudos");

async function save(kudoToSave) {
  const kudo = new Kudo(kudoToSave);

  await kudo.save();

  return kudo.toJSON();
}

async function find(filters) {
  const result = await Kudo.find();
  return result;
}

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("----- connected to db -----");
  } catch (err) {
    console.error("Error while connecting to mongo", err);
  }
}

module.exports = { save, find };
