function errorHandler(error) {
  console.error(error);
  throw new Error("Fail operation in server");
}

module.exports = errorHandler;
