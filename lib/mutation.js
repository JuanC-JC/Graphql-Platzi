const { connectDB } = require("./db");
const { ObjectId } = require("mongodb");

const { create, update, remove, findById } = require("./utils");
const errorHandler = require("./errorHandler");

const courses = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: "",
      topic: "",
    };

    const newCourse = { ...defaults, ...input };

    try {
      return await create("courses", newCourse);
    } catch (e) {
      errorHandler(e);
    }
  },

  editCourse: async (root, { _id, input }) => {
    try {
      return update("courses", _id, input);
    } catch (e) {
      errorHandler(e);
    }
  },

  deleteCourse: async (root, { _id }) => {
    try {
      return remove("courses", _id);
    } catch (e) {
      errorHandler(e);
    }
  },

  addPeople: async (root, { courseID, personID }) => {
    try {
      const db = await connectDB();
      const course = await findById("courses", courseID);
      const person = await findById("students", personID);

      if (!course || !person) {
        throw new Error("The person or course not exists");
      }

      await db
        .collection("courses")
        .findOneAndUpdate(
          { _id: ObjectId(courseID) },
          { $addToSet: { people: ObjectId(personID) } }
        );

      return await findById("courses", courseID);
    } catch (e) {
      errorHandler(e);
    }
  },
};

const students = {
  createPerson: async (root, { input }) => {
    try {
      return await create("students", input);
    } catch (e) {
      errorHandler(e);
    }
  },

  editPerson: async (root, { _id, input }) => {
    try {
      return update("students", _id, input);
    } catch (e) {
      errorHandler(e);
    }
  },

  deletePerson: async (root, { _id }) => {
    try {
      return remove("students", _id);
    } catch (e) {
      errorHandler(e);
    }
  },
};

module.exports = { ...courses, ...students };
