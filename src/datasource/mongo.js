const mongoose = require("mongoose");

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const db = process.env.MONGO_DATABASE;

const uri = `mongodb://${user}:${password}@ds127811.mlab.com:27811/${db}`;

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
