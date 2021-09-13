"use strict";

const { makeExecutableSchema } = require("graphql-tools");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { readFileSync } = require("fs");
const { join } = require("path");
const cors = require("cors");
const resolvers = require("./lib/resolvers");

const typeDefs = readFileSync(
  join(__dirname, "lib", "schema.graphql"),
  "utf-8"
);

const app = express();
const port = process.env.PORT || 3000;

const isDev = process.env.NODE_ENV !== "production";

// define schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(cors());

app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: isDev,
  })
);

app.listen(port, () =>
  console.log("server is listening at http://localhost:3000/api")
);
