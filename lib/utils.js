const { ObjectId } = require("mongodb");
const { connectDB } = require("./db");

async function listAll(collection) {
  const connection = await connectDB();
  return connection.collection(collection).find({}).toArray();
}

async function findById(collection, id) {
  const connection = await connectDB();
  return connection.collection(collection).findOne({ _id: ObjectId(id) });
}

async function create(collection, data) {
  const connection = await connectDB();
  const res = await connection.collection(collection).insertOne(data);
  data._id = res.insertedId;
  return data;
}

async function update(collection, id, data) {
  const connection = await connectDB();
  const res = await connection
    .collection(collection)
    .findOneAndUpdate({ _id: ObjectId(id) }, { $set: data });
  return { ...res.value, ...data };
}

async function remove(collection, id, data) {
  const connection = await connectDB();
  const res = await connection
    .collection(collection)
    .deleteOne({ _id: ObjectId(id) });

  if (res.deletedCount > 0) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  findById,
  listAll,
  create,
  update,
  remove,
};
