module.exports = {
  resolve: {
    fallback: {
      "util": require.resolve("util/"),
      "path": require.resolve("path-browserify"),
      "stream": require.resolve("path-browserify"),
      "events": require.resolve("events/")
    }
  }
};
