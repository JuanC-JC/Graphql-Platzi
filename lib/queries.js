const { connectDB } = require("./db");
const { ObjectId } = require("mongodb");
const errorHandler = require("./errorHandler");
const { findById, listAll } = require("./utils");

const courses = {
  courses: async () => {
    try {
      return await listAll("courses");
    } catch (e) {
      errorHandler(e);
    }
  },
  getCourse: async (root, { _id }, context) => {
    try {
      return await findById("courses", _id);
    } catch (e) {
      errorHandler(e);
    }
  },
};

const students = {
  people: async () => {
    try {
      const db = await connectDB();
      const students = await db.collection("students").find().toArray();
      console.log("get students");
      return students;
    } catch (e) {
      console.error("Cannot find students", e);
    }
  },
  getPerson: async (root, { _id }, context) => {
    try {
      const db = await connectDB();
      const student = await db
        .collection("students")
        .findOne({ _id: ObjectId(_id) });
      return student;
    } catch (error) {
      console.error(error);
    }
  },
};

const others = {
  searchItems: async (root, { keyword }) => {
    try {
      const db = await connectDB();
      const courses = await db
        .collection("courses")
        .find({
          $or: [
            {
              title: {
                $regex: `${keyword}.*`,
              },
            },
            {
              description: {
                $regex: `${keyword}.*`,
              },
            },
          ],
        })
        .toArray();
      const people = await db
        .collection("students")
        .find({
          $text: {
            $search: keyword,
          },
        })
        .toArray();

      return [...courses, ...people];
    } catch (e) {
      errorHandler(e);
    }
  },
};

module.exports = { ...courses, ...students, ...others };
