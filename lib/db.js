const { MongoClient } = require("mongodb");

const { dbUser, dbPassword, dbHost, dbName } = require("./config");

const coursesData = [
  {
    title: "Mi titulo 1",
    teacher: "Mi profesor",
    description: "Una descripcion",
    topic: "Programacion",
  },
  {
    title: "Mi titulo 2",
    teacher: "Mi profesor",
    description: "Una descripcion",
    topic: "Programacion",
  },
  {
    title: "Mi titulo 3",
    teacher: "Mi profesor",
    description: "Una descripcion",
    topic: "Programacion",
  },
];

// const mongoUrl = `mongodb+srv://${test}:${juankamil0}@${dbHost}/${"test"}?retryWrites=true&useUnifiedTopology=true&w=majority`;
const mongoUrl = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`;

let connection = null;

const connectDB = async () => {
  if (connection) return connection;

  // console.log(mongoUrl);

  let client;

  try {
    client = await MongoClient.connect(mongoUrl, {
      useNewUrlParser: true,
    });
    connection = client.db(dbName);
  } catch (error) {
    console.log("sorry you can not connect to db -> ", error);
    process.exit(1);
  }

  return connection;
};

const main = async () => {
  const db = await connectDB();

  const collectionName = "courses";

  try {
    const exists =
      (await (
        await db.listCollections().toArray()
      ).findIndex((item) => item.name === collectionName)) !== -1;

    if (!exists) {
      console.log("Collection courses not exists:");

      await db.createCollection(collectionName);

      console.log("Sucessfull creation courses collection");

      const insertRes = await db.collection("courses").insertMany(coursesData);

      console.log("Sucessfull records inserted -> ", insertRes.insertedCount);
    }
  } catch (err) {
    console.error(err);
  }
};

main();

module.exports = { connectDB };
