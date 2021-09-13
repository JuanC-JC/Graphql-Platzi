const { connectDB } = require("./db");
const { ObjectId } = require("mongodb");
const errorHandler = require("./errorHandler");

//to resolve types example nested array course{id, name, students[objectIdStudent]}

//when do a peticion tha involved course, it execute this if its property is here
module.exports = {
  Course: {
    // title: ({ title }) => {
    //   return `${title} modified by a resolver of types`;
    // },
    people: async ({ people }) => {
      try {
        if (!people || people.length === 0) return [];

        const db = await connectDB();

        const ids = people.map((id) => ObjectId(id));

        peopleData = await db
          .collection("students")
          .find({ _id: { $in: ids } })
          .toArray();

        return peopleData;
      } catch (e) {
        errorHandler(e);
      }
    },
  },
  Person: {
    __resolveType: (person, context, info) => {
      if (person.phone) {
        return "Monitor";
      }
      return "Student";
    },
  },
  GlobalSearch: {
    __resolveType: (item, context, info) => {
      if (item.title) {
        return "Course";
      }

      if (item.phone) {
        return "Monitor";
      }

      return "Student";
    },
  },
};
