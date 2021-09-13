// Resolver to query
// they need to have the same name to his query in schema

// const db = require("db");
const mutations = require("./mutation");
const queries = require("./queries");
const types = require("./types");

// we use collection students for people in courses
module.exports = {
  Query: queries,
  Mutation: mutations,
  ...types,
};
